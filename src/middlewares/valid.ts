import { NextFunction, Request, Response } from 'express';
import Ajv from "ajv"
const ajv = new Ajv()

export const validate = (schema: any) => {
  const validation = ajv.compile(schema);
  return async (req: Request, res: Response, next: NextFunction) => {
    const valid = validation(req.body);
    if (valid) {
      next();
    } else {
      res.status(400).send(validation.errors.map(e => ({ errors: e.params, message: e.message })));
    }
  };
}
