import z from "zod";
const deleteParamSchema = z.object({
  id: z.string(),
});
export type IDeleteDutyDTO = z.infer<typeof deleteParamSchema>;
