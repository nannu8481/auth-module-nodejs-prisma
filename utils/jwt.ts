import jwt from "jsonwebtoken";
const createError = require("http-errors");
require("dotenv").config();

const accessTokenSecret: any = process.env.ACCESS_TOKEN_SECRET;

module.exports = {
  signAccessToken(payload: any) {
    return new Promise((resolve, reject) => {
      jwt.sign({ payload }, accessTokenSecret, {}, (err, token) => {
        if (err) {
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken(token: any) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, accessTokenSecret, (err: any, payload: any) => {
        if (err) {
          const message =
            err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
          return reject(createError.Unauthorized(message));
        }
        resolve(payload);
      });
    });
  },
};
