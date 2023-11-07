"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createError = require("http-errors");
require("dotenv").config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
module.exports = {
    signAccessToken(payload) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.sign({ payload }, accessTokenSecret, {}, (err, token) => {
                if (err) {
                    reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },
    verifyAccessToken(token) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, accessTokenSecret, (err, payload) => {
                if (err) {
                    const message = err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
                    return reject(createError.Unauthorized(message));
                }
                resolve(payload);
            });
        });
    },
};
