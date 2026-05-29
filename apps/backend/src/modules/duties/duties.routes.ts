import { Router } from "express";
import { DutiesController } from "./duties.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  createDutyBodySchema,
  dutyIdParamSchema,
  updateDutyBodySchema,
} from "./duties.schema.js";
const dutiesRoutes = async (): Promise<Router> => {
  const router = Router();
  const dutiesController = new DutiesController();
  router.get("/list", dutiesController.getAllDuties);
  router.post(
    "/create",
    validate({ body: createDutyBodySchema }),
    dutiesController.createDuty,
  );
  router.delete(
    "/delete/:id",
    validate({ params: dutyIdParamSchema }),
    dutiesController.deleteDuty,
  );
  router.put(
    "/edit/:id",
    validate({ params: dutyIdParamSchema, body: updateDutyBodySchema }),
    dutiesController.editDuty,
  );

  return router;
};

export default dutiesRoutes;
