import { Request, Response, NextFunction } from "express";
import { DutiesController } from "../src/modules/duties/duties.controller.js";
import { DutiesService } from "../src/modules/duties/duties.service.js";
import { IDuty } from "../src/modules/duties/duties.types.js";
import * as dtoUtils from "../src/utils/dto.js";
jest.mock("../src/modules/duties/duties.service.js");
jest.mock("../src/utils/dto.js");

describe("DutiesController", () => {
  let dutiesController: DutiesController;
  let mockService: jest.Mocked<DutiesService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  const mockDuty: IDuty = {
    id: "1",
    title: "Test Duty",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    dutiesController = new DutiesController();
    mockService = (dutiesController as any).dutiesService;

    mockRequest = {
      body: {},
      params: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();
  });

  describe("getAllDuties", () => {
    it("should return all duties with success status", async () => {
      const mockDuties: IDuty[] = [mockDuty];
      const sortedDuties: IDuty[] = [mockDuty];

      mockService.getAllDuties.mockResolvedValue(mockDuties);
      (dtoUtils.sortAscending as jest.Mock).mockReturnValue(sortedDuties);

      await dutiesController.getAllDuties(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockService.getAllDuties).toHaveBeenCalledTimes(1);
      expect(dtoUtils.sortAscending).toHaveBeenCalledWith(mockDuties);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: sortedDuties,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next with error when service throws", async () => {
      const error = new Error("Database error");
      mockService.getAllDuties.mockRejectedValue(error);

      await dutiesController.getAllDuties(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("createDuty", () => {
    it("should create a duty successfully", async () => {
      mockRequest.body = { title: "New Duty" };
      mockService.createDuty.mockResolvedValue(mockDuty);

      await dutiesController.createDuty(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockService.createDuty).toHaveBeenCalledWith({
        title: "New Duty",
      });
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockDuty,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next with error when title is missing", async () => {
      mockRequest.body = {};
      const error = new Error("Validation failed: title is required");
      mockService.createDuty.mockRejectedValue(error);

      await dutiesController.createDuty(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it("should call next with error when service throws", async () => {
      mockRequest.body = { title: "New Duty" };
      const error = new Error("Database error");
      mockService.createDuty.mockRejectedValue(error);

      await dutiesController.createDuty(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("deleteDuty", () => {
    it("should delete a duty successfully", async () => {
      mockRequest.params = { id: "1" };
      mockService.deleteDuty.mockResolvedValue();

      await dutiesController.deleteDuty(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockService.deleteDuty).toHaveBeenCalledWith("1");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: "Duty with ID 1 has been deleted",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should throw error when ID is undefined", async () => {
      mockRequest.params = {};
      const error = new Error("Validation failed: ID parameter is required");

      await dutiesController.deleteDuty(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it("should call next with error when service throws", async () => {
      mockRequest.params = { id: "999" };
      const error = new Error("Delete failed: cannot find duty with ID 999");
      mockService.deleteDuty.mockRejectedValue(error);

      await dutiesController.deleteDuty(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("editDuty", () => {
    it("should edit a duty successfully", async () => {
      mockRequest.params = { id: "1" };
      mockRequest.body = { title: "Updated Duty" };
      const updatedDuty: IDuty = { ...mockDuty, title: "Updated Duty" };
      mockService.editDuty.mockResolvedValue(updatedDuty);

      await dutiesController.editDuty(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockService.editDuty).toHaveBeenCalledWith("1", {
        title: "Updated Duty",
      });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: updatedDuty,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should throw error when ID is undefined", async () => {
      mockRequest.params = {};
      mockRequest.body = { title: "Updated Duty" };

      await dutiesController.editDuty(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it("should call next with error when duty not found", async () => {
      mockRequest.params = { id: "999" };
      mockRequest.body = { title: "Updated Duty" };
      const error = new Error("Edit failed: cannot find duty with ID 999");
      mockService.editDuty.mockRejectedValue(error);

      await dutiesController.editDuty(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it("should call next with error when service throws", async () => {
      mockRequest.params = { id: "1" };
      mockRequest.body = { title: "Updated Duty" };
      const error = new Error("Database error");
      mockService.editDuty.mockRejectedValue(error);

      await dutiesController.editDuty(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });
});
