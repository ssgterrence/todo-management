import { query } from "../../config/db.connection.js";
import { DutyQueries } from "./duties.quries.js";
import { IUpdateDutyDTO, IDuty, ICreateDutyDTO } from "./duties.types.js";

export class DutySQLHandler {
  async findAll(): Promise<IDuty[]> {
    const result = await query(DutyQueries.FIND_ALL);
    return result.rows as IDuty[];
  }

  async findById(id: string): Promise<IDuty | null> {
    const result = await query(DutyQueries.FIND_BY_ID, [id]);
    return result.rows[0] || null;
  }

  async exists(id: string): Promise<boolean> {
    const result = await query(DutyQueries.CHECK_EXISTS, [id]);
    return result.rows[0].exists;
  }

  async create(duty: ICreateDutyDTO): Promise<IDuty> {
    const result = await query(DutyQueries.CREATE, [duty.title]);
    return result.rows[0];
  }

  async update(id: string, duty: IUpdateDutyDTO): Promise<IDuty | null> {
    const result = await query(DutyQueries.UPDATE, [duty.title, id]);
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await query(DutyQueries.DELETE, [id]);
    return (result.rowCount || 0) > 0;
  }
}
