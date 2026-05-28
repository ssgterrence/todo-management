import { Router } from "express";
import { dutiesRoutes } from "../modules/duties/index.js";

export const initCentralRoutes = async (): Promise<Router> => {
  const mainRouter = Router();
  const dutiesModule = await dutiesRoutes();
  mainRouter.use("/duties", dutiesModule);
  return mainRouter;
};
