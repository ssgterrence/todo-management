import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initCentralRoutes } from "./routes/index.js";
import { notFoundHandler } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const main = async () => {
  const app = express();
  const PORT = process.env["PORT"] || 4001;
  app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:4173"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
  app.use(express.json());
  const centralRoutes = await initCentralRoutes();
  app.use("/v1", centralRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main().catch((error) => {
  console.error("Error starting the server:", error);
  process.exit(1);
});
