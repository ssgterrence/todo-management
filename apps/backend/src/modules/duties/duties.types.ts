export interface IDuty {
  id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateDutyDTO {
  title: string;
}

export interface IUpdateDutyDTO {
  title: string;
}
