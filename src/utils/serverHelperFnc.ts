import { ZodIssue } from "zod";

export const findErrors = async (fieldName: string, errors: ZodIssue[]) => {
  try {
    return (errors ?? [])
      .filter((item) => {
        return item.path.includes(fieldName);
      })
      .map((item) => item.message);
  } catch (error) {
    console.log("ERROR IN findErrors:", error);
  }
};
