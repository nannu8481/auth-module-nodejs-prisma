const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createError = require("http-errors");

require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

class AuthService {
  static async register(data: any) {
    const { email } = data;

    const checkEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (checkEmail) {
      throw createError.NotFound("User already registered");
    }

    data.password = bcrypt.hashSync(data.password, 8);
    let user = await prisma.user.create({
      data,
    });
    data.accessToken = await jwt.signAccessToken(user);
    return data;
  }

  static async login(data: any) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw createError.NotFound("User not registered");
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword)
      throw createError.Unauthorized("Email address or password not valid");
    delete user.password;
    const accessToken = await jwt.signAccessToken(user);
    return { ...user, accessToken };
  }
}

module.exports = AuthService;
