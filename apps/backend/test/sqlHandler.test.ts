import { DutySQLHandler } from "../src/modules/duties/sqlHandler.js";
import { query } from "../src/config/db.connection.js";
import { DutyQueries } from "../src/modules/duties/duties.quries.js";
import {
  IDuty,
  ICreateDutyDTO,
  IUpdateDutyDTO,
} from "../src/modules/duties/duties.types.js";
jest.mock("../src/config/db.connection.js");

describe("DutySQLHandler", () => {
  let sqlHandler: DutySQLHandler;
  const mockQuery = query as jest.MockedFunction<typeof query>;

  const mockDuty: IDuty = {
    id: "1",
    name: "Test Duty",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    sqlHandler = new DutySQLHandler();
  });

  describe("findAll", () => {
    it("should return all duties", async () => {
      const mockDuties: IDuty[] = [mockDuty];
      mockQuery.mockResolvedValue({ rows: mockDuties } as any);

      const result = await sqlHandler.findAll();

      expect(result).toEqual(mockDuties);
      expect(mockQuery).toHaveBeenCalledWith(DutyQueries.FIND_ALL);
      expect(mockQuery).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no duties exist", async () => {
      mockQuery.mockResolvedValue({ rows: [] } as any);

      const result = await sqlHandler.findAll();

      expect(result).toEqual([]);
      expect(mockQuery).toHaveBeenCalledWith(DutyQueries.FIND_ALL);
    });
  });

  describe("findById", () => {
    it("should return a duty when found", async () => {
      mockQuery.mockResolvedValue({ rows: [mockDuty] } as any);

      const result = await sqlHandler.findById("1");

      expect(result).toEqual(mockDuty);
      expect(mockQuery).toHaveBeenCalledWith(DutyQueries.FIND_BY_ID, ["1"]);
    });

    it("should return null when duty not found", async () => {
      mockQuery.mockResolvedValue({ rows: [] } as any);

      const result = await sqlHandler.findById("999");

      expect(result).toBeNull();
      expect(mockQuery).toHaveBeenCalledWith(DutyQueries.FIND_BY_ID, ["999"]);
    });
  });

  describe("exists", () => {
    it("should return true when duty exists", async () => {
      mockQuery.mockResolvedValue({ rows: [{ exists: true }] } as any);

      const result = await sqlHandler.exists("1");

      expect(result).toBe(true);
      expect(mockQuery).toHaveBeenCalledWith(DutyQueries.CHECK_EXISTS, ["1"]);
    });

    it("should return false when duty does not exist", async () => {
      mockQuery.mockResolvedValue({ rows: [{ exists: false }] } as any);

      const result = await sqlHandler.exists("999");

      expect(result).toBe(false);
      expect(mockQuery).toHaveBeenCalledWith(DutyQueries.CHECK_EXISTS, ["999"]);
    });
  });

  describe("create", () => {
    it("should create a new duty and return it", async () => {
      const createDTO: ICreateDutyDTO = { name: "New Duty" };
      mockQuery.mockResolvedValue({ rows: [mockDuty] } as any);

      const result = await sqlHandler.create(createDTO);

      expect(result).toEqual(mockDuty);
      expect(mockQuery).toHaveBeenCalledWith(DutyQueries.CREATE, ["New Duty"]);
    });

    it("should create duty with correct name", async () => {
      const createDTO: ICreateDutyDTO = { name: "Important Task" };
      const newDuty: IDuty = { ...mockDuty, name: "Important Task" };
      mockQuery.mockResolvedValue({ rows: [newDuty] } as any);

      const result = await sqlHandler.create(createDTO);

      expect(result.name).toBe("Important Task");
      expect(mockQuery).toHaveBeenCalledWith(DutyQueries.CREATE, [
        "Important Task",
      ]);
    });
  });

  describe("update", () => {
    it("should update a duty and return the updated duty", async () => {
      const updateDTO: IUpdateDutyDTO = { name: "Updated Duty" };
      const updatedDuty: IDuty = { ...mockDuty, name: "Updated Duty" };
      mockQuery.mockResolvedValue({ rows: [updatedDuty] } as any);

      const result = await sqlHandler.update("1", updateDTO);

      expect(result).toEqual(updatedDuty);
      expect(mockQuery).toHaveBeenCalledWith(DutyQueries.UPDATE, [
        "Updated Duty",
        "1",
      ]);
    });

    it("should return null when duty not found", async () => {
      const updateDTO: IUpdateDutyDTO = { name: "Updated Duty" };
      mockQuery.mockResolvedValue({ rows: [] } as any);

      const result = await sqlHandler.update("999", updateDTO);

      expect(result).toBeNull();
      expect(mockQuery).toHaveBeenCalledWith(DutyQueries.UPDATE, [
        "Updated Duty",
        "999",
      ]);
    });
  });

  describe("delete", () => {
    it("should delete a duty and return true", async () => {
      mockQuery.mockResolvedValue({ rowCount: 1 } as any);

      const result = await sqlHandler.delete("1");

      expect(result).toBe(true);
      expect(mockQuery).toHaveBeenCalledWith(DutyQueries.DELETE, ["1"]);
    });

    it("should return false when duty not found", async () => {
      mockQuery.mockResolvedValue({ rowCount: 0 } as any);

      const result = await sqlHandler.delete("999");

      expect(result).toBe(false);
      expect(mockQuery).toHaveBeenCalledWith(DutyQueries.DELETE, ["999"]);
    });

    it("should handle null rowCount", async () => {
      mockQuery.mockResolvedValue({ rowCount: null } as any);

      const result = await sqlHandler.delete("1");

      expect(result).toBe(false);
    });
  });
});
