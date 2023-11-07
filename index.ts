import dotenv from "dotenv";
import createServer from "./app";
dotenv.config();
const port = process.env.PORT || 3002;

const app = createServer();

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.log(`Error occured: ${(error as any).message}`);
}
