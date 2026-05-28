import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const main = async () => {
  const app = express();
  const PORT = process.env["PORT"] || 3000;
  app.use(cors());
  app.use(express.json());
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main().catch((error) => {
  console.error("Error starting the server:", error);
  process.exit(1);
});

main();
