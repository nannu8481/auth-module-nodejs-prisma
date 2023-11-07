"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createError = require("http-errors");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
class AuthService {
    static register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = data;
            const checkEmail = yield prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (checkEmail) {
                throw createError.NotFound("User already registered");
            }
            data.password = bcrypt.hashSync(data.password, 8);
            let user = yield prisma.user.create({
                data,
            });
            data.accessToken = yield jwt.signAccessToken(user);
            return data;
        });
    }
    static login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const user = yield prisma.user.findUnique({
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
            const accessToken = yield jwt.signAccessToken(user);
            return Object.assign(Object.assign({}, user), { accessToken });
        });
    }
}
module.exports = AuthService;
