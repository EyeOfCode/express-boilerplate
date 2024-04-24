import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const UserValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });

  if (schema.validate(req.body).error) {
    return res.status(400).send(schema.validate(req.body).error?.details);
  }
  next();
};
