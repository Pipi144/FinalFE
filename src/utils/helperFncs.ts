import { ZodIssue } from "zod";

export const findErrors = (fieldName: string, errors: ZodIssue[]) => {
  return (errors ?? [])
    .filter((item) => {
      return item.path.includes(fieldName);
    })
    .map((item) => item.message);
};

export const removeFalsyProps = <T extends Record<string, any>>(
  obj: T
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => Boolean(value))
  ) as Partial<T>;
};
