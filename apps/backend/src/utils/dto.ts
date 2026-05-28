import { IDuty } from "../modules/duties/duties.types.js";

const sortAscending = (duties: IDuty[]): IDuty[] => {
  return duties.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
};

export { sortAscending };
