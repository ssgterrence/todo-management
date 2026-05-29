import z from "zod";

export const dutyIdParamSchema = z.object({
  id: z.string().trim().min(1, "id is required"),
});

export const createDutyBodySchema = z.object({
  name: z.string().trim().min(1, "name is required"),
});

export const updateDutyBodySchema = z.object({
  name: z.string().trim().min(1, "name is required"),
});

export type IDeleteDutyDTO = z.infer<typeof dutyIdParamSchema>;
