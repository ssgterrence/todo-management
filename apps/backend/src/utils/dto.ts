import { IDuty } from "../modules/duties/duties.types.js";

const sortAscending = (duties: IDuty[]): IDuty[] => {
  return duties.sort((a, b) => Number(a.id) - Number(b.id));
};

export { sortAscending };
