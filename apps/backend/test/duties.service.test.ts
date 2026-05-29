import { DutiesService } from "../src/modules/duties/duties.service.js";
import { DutySQLHandler } from "../src/modules/duties/sqlHandler.js";
import {
  IDuty,
  ICreateDutyDTO,
  IUpdateDutyDTO,
} from "../src/modules/duties/duties.types.js";

jest.mock("../src/modules/duties/sqlHandler.js");

describe("DutiesService", () => {
  let dutiesService: DutiesService;
  let mockSQLHandler: jest.Mocked<DutySQLHandler>;

  const mockDuty: IDuty = {
    id: "1",
    title: "Test Duty",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    dutiesService = new DutiesService();
    mockSQLHandler = (dutiesService as any).sqlHandler;
  });

  describe("getAllDuties", () => {
    it("should return all duties", async () => {
      const mockDuties: IDuty[] = [mockDuty];
      mockSQLHandler.findAll.mockResolvedValue(mockDuties);

      const result = await dutiesService.getAllDuties();

      expect(result).toEqual(mockDuties);
      expect(mockSQLHandler.findAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no duties exist", async () => {
      mockSQLHandler.findAll.mockResolvedValue([]);

      const result = await dutiesService.getAllDuties();

      expect(result).toEqual([]);
      expect(mockSQLHandler.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("createDuty", () => {
    it("should create a new duty successfully", async () => {
      const createDTO: ICreateDutyDTO = { title: "New Duty" };
      mockSQLHandler.create.mockResolvedValue(mockDuty);

      const result = await dutiesService.createDuty(createDTO);

      expect(result).toEqual(mockDuty);
      expect(mockSQLHandler.create).toHaveBeenCalledWith(createDTO);
      expect(mockSQLHandler.create).toHaveBeenCalledTimes(1);
    });

    it("should throw error when title is missing", async () => {
      const createDTO: ICreateDutyDTO = { title: "" };

      await expect(dutiesService.createDuty(createDTO)).rejects.toThrow(
        "Validation failed: title is required",
      );
      expect(mockSQLHandler.create).not.toHaveBeenCalled();
    });

    it("should log the duty title when creating", async () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();
      const createDTO: ICreateDutyDTO = { title: "New Duty" };
      mockSQLHandler.create.mockResolvedValue(mockDuty);

      await dutiesService.createDuty(createDTO);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Creating duty with title:",
        "New Duty",
      );
      consoleSpy.mockRestore();
    });
  });

  describe("updateDuty", () => {
    it("should update a duty successfully", async () => {
      const updateDTO: IUpdateDutyDTO = { title: "Updated Duty" };
      const updatedDuty: IDuty = { ...mockDuty, title: "Updated Duty" };

      mockSQLHandler.exists.mockResolvedValue(true);
      mockSQLHandler.update.mockResolvedValue(updatedDuty);

      const result = await dutiesService.updateDuty("1", updateDTO);

      expect(result).toEqual(updatedDuty);
      expect(mockSQLHandler.exists).toHaveBeenCalledWith("1");
      expect(mockSQLHandler.update).toHaveBeenCalledWith("1", updateDTO);
    });

    it("should throw error when duty does not exist", async () => {
      const updateDTO: IUpdateDutyDTO = { title: "Updated Duty" };
      mockSQLHandler.exists.mockResolvedValue(false);

      await expect(dutiesService.updateDuty("999", updateDTO)).rejects.toThrow(
        "Update failed: cannot find duty with ID 999",
      );
      expect(mockSQLHandler.update).not.toHaveBeenCalled();
    });

    it("should throw error when update operation fails", async () => {
      const updateDTO: IUpdateDutyDTO = { title: "Updated Duty" };
      mockSQLHandler.exists.mockResolvedValue(true);
      mockSQLHandler.update.mockResolvedValue(null);

      await expect(dutiesService.updateDuty("1", updateDTO)).rejects.toThrow(
        "Update failed: update operation failed",
      );
    });
  });

  describe("deleteDuty", () => {
    it("should delete a duty successfully", async () => {
      mockSQLHandler.exists.mockResolvedValue(true);
      mockSQLHandler.delete.mockResolvedValue(true);

      await dutiesService.deleteDuty("1");

      expect(mockSQLHandler.exists).toHaveBeenCalledWith("1");
      expect(mockSQLHandler.delete).toHaveBeenCalledWith("1");
    });

    it("should throw error when duty does not exist", async () => {
      mockSQLHandler.exists.mockResolvedValue(false);

      await expect(dutiesService.deleteDuty("999")).rejects.toThrow(
        "Delete failed: cannot find duty with ID 999",
      );
      expect(mockSQLHandler.delete).not.toHaveBeenCalled();
    });

    it("should throw error when delete operation fails", async () => {
      mockSQLHandler.exists.mockResolvedValue(true);
      mockSQLHandler.delete.mockResolvedValue(false);

      await expect(dutiesService.deleteDuty("1")).rejects.toThrow(
        "Delete failed: delete operation failed",
      );
    });
  });
});
