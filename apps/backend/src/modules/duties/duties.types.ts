export interface IDuty {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateDutyDTO {
  name: string;
}

export interface IUpdateDutyDTO {
  name: string;
}
