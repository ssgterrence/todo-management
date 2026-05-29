import { Request, Response, NextFunction } from "express";
import { DutiesService } from "./duties.service.js";
import { sortAscending } from "../../utils/dto.js";

export class DutiesController {
  private dutiesService = new DutiesService();

  public getAllDuties = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const duties = await this.dutiesService.getAllDuties();
      res.status(200).json({
        success: true,
        data: sortAscending(duties),
      });
    } catch (error) {
      next(error);
    }
  };

  public createDuty = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { name } = req.body;
      const newDuty = await this.dutiesService.createDuty({ name });
      res.status(201).json({
        success: true,
        data: newDuty,
      });
    } catch (error) {
      next(error);
    }
  };
  public deleteDuty = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params as { id: string };
      if (id === undefined) {
        throw new Error("Validation failed: ID parameter is required");
      }
      await this.dutiesService.deleteDuty(id);
      res.status(200).json({
        success: true,
        message: `Duty with ID ${id} has been deleted`,
      });
    } catch (error) {
      next(error);
    }
  };
  public editDuty = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params as { id: string };
      const { name } = req.body;
      if (id === undefined) {
        throw new Error("Validation failed: ID parameter is required");
      }
      const updatedDuty = await this.dutiesService.editDuty(id, { name });
      res.status(200).json({
        success: true,
        data: updatedDuty,
      });
    } catch (error) {
      next(error);
    }
  };
}
