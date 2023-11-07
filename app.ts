import express, { Application, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth";

const createServer = (): express.Application => {
  const app: Application = express();

  // Body parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use("/api/v1/auth", authRoutes);

  // eslint-disable-next-line no-unused-vars
  app.get("/", async (_req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      message: "hello",
    });
  });
  return app;
};

export default createServer;
