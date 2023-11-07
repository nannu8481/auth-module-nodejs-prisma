import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const auth = require("../../services/auth.service");
const createError = require("http-errors");

const prisma = new PrismaClient();

const controller = {
  signUp: async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      const user = await auth.register(req.body);
      res.status(200).json({
        status: true,
        message: "User created successfully",
        data: user,
      });
    } catch (e: any) {
      next(createError(e.statusCode, e.message));
    }
  },

  signIn: async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      const data = await auth.login(req.body);
      res.status(200).json({
        status: true,
        message: "Account login successful",
        data,
      });
    } catch (e: any) {
      next(createError(e.statusCode, e.message));
    }
  },
};

export default controller;
