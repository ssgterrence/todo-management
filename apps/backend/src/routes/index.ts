import { Router } from "express";
import { dutiesRoutes } from "../modules/index.js";
import { db } from "../config/db.connection.js";

export const initCentralRoutes = async (): Promise<Router> => {
  const mainRouter = Router();
  mainRouter.get("/health", async (_req, res) => {
    try {
      await db.query("SELECT 1");
      res
        .status(200)
        .json({ status: "ok", timestamp: new Date().toISOString() });
    } catch (error) {
      res.status(503).json({
        status: "error",
        message:
          error instanceof Error ? error.message : "Database connection failed",
        timestamp: new Date().toISOString(),
      });
    }
  });
  const dutiesModule = await dutiesRoutes();
  mainRouter.use("/duties", dutiesModule);
  return mainRouter;
};
