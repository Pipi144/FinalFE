import { ZodIssue } from "zod";

export const findErrors = (fieldName: string, errors: ZodIssue[]) => {
  return (errors ?? [])
    .filter((item) => {
      return item.path.includes(fieldName);
    })
    .map((item) => item.message);
};
