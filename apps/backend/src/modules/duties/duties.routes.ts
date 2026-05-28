import { Router } from "express";
import { DutiesController } from "./duties.controller.js";
const dutiesRoutes = async (): Promise<Router> => {
  const router = Router();
  const dutiesController = new DutiesController();
  router.get("/list", dutiesController.getAllDuties);
  router.post("/create", dutiesController.createDuty);
  router.delete("/delete/:id", dutiesController.deleteDuty);

  return router;
};

export default dutiesRoutes;
