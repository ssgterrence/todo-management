import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initCentralRoutes } from "./routes/index.js";

dotenv.config();

const main = async () => {
  const app = express();
  const PORT = process.env["PORT"] || 4001;
  app.use(cors());
  app.use(express.json());
  const centralRoutes = await initCentralRoutes();
  app.use("/v1", centralRoutes);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main().catch((error) => {
  console.error("Error starting the server:", error);
  process.exit(1);
});

main();
