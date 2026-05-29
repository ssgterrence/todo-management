import type { NextFunction, Request, RequestHandler, Response } from "express";

type SchemaLike = {
  parse: (input: unknown) => unknown;
};

type ValidationSchemas = {
  body?: SchemaLike;
  params?: SchemaLike;
  query?: SchemaLike;
};

export const validate = (schemas: ValidationSchemas): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.params) {
        req.params = schemas.params.parse(req.params) as any;
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query) as any;
      }
      if (schemas.body) {
        req.body = schemas.body.parse(req.body) as any;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
