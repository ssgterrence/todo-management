import { ICreateDutyDTO, IDuty, IUpdateDutyDTO } from "./duties.types.js";
import { DutySQLHandler } from "./sqlHandler.js";

export class DutiesService {
  private sqlHandler = new DutySQLHandler();
  public async getAllDuties(): Promise<IDuty[]> {
    return await this.sqlHandler.findAll();
  }
  public async createDuty(dto: ICreateDutyDTO): Promise<IDuty> {
    if (!dto.title) {
      throw new Error("Validation failed: title is required");
    }
    console.log("Creating duty with title:", dto.title);
    return await this.sqlHandler.create(dto);
  }
  public async updateDuty(id: string, dto: IUpdateDutyDTO): Promise<IDuty> {
    const isExist = await this.sqlHandler.exists(id);
    if (!isExist) {
      throw new Error(`Update failed: cannot find duty with ID ${id}`);
    }

    const updatedDuty = await this.sqlHandler.update(id, dto);
    if (!updatedDuty) {
      throw new Error("Update failed: update operation failed");
    }
    return updatedDuty;
  }
  public async deleteDuty(id: string): Promise<void> {
    const isExist = await this.sqlHandler.exists(id);
    if (!isExist) {
      throw new Error(`Delete failed: cannot find duty with ID ${id}`);
    }
    const isDeleted = await this.sqlHandler.delete(id);
    if (!isDeleted) {
      throw new Error("Delete failed: delete operation failed");
    }
  }
}
