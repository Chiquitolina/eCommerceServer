import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate = (
  schema: ZodSchema,
  target: "body" | "query" | "params" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[target]); // Valida la parte de la solicitud indicada
      next();
    } catch (error) {
      res.status(400).json({
        message: "Validation error",
        errors: (error as any).errors,
      });
    }
  };
};
