import { sortAscending } from "../src/utils/dto.js";
import { IDuty } from "../src/modules/duties/duties.types.js";

describe("DTO Utils", () => {
  describe("sortAscending", () => {
    it("should sort duties in ascending order by id", () => {
      const duties: IDuty[] = [
        {
          id: "3",
          title: "Third",
          created_at: new Date("2024-01-03"),
          updated_at: new Date("2024-01-03"),
        },
        {
          id: "1",
          title: "First",
          created_at: new Date("2024-01-01"),
          updated_at: new Date("2024-01-01"),
        },
        {
          id: "2",
          title: "Second",
          created_at: new Date("2024-01-02"),
          updated_at: new Date("2024-01-02"),
        },
      ];

      const result = sortAscending(duties);

      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
      expect(result[2].id).toBe("3");
    });

    it("should return empty array when given empty array", () => {
      const duties: IDuty[] = [];

      const result = sortAscending(duties);

      expect(result).toEqual([]);
    });

    it("should handle duties with non-sequential ids", () => {
      const duties: IDuty[] = [
        {
          id: "100",
          title: "Hundred",
          created_at: new Date("2024-01-01"),
          updated_at: new Date("2024-01-01"),
        },
        {
          id: "5",
          title: "Five",
          created_at: new Date("2024-01-02"),
          updated_at: new Date("2024-01-02"),
        },
        {
          id: "50",
          title: "Fifty",
          created_at: new Date("2024-01-03"),
          updated_at: new Date("2024-01-03"),
        },
      ];

      const result = sortAscending(duties);

      expect(result[0].id).toBe("5");
      expect(result[1].id).toBe("50");
      expect(result[2].id).toBe("100");
    });
  });
});
