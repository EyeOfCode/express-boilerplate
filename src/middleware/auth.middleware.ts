import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import AuthController from "../controllers/auth/auth.controller";
import { IUser } from "../models/user.model";

export interface IRequest extends Request {
  auth?: IUser;
}

export const AuthMiddleware = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authController = new AuthController();
    const auth = await authController.verifyToken(req, res);
    req.auth = auth;
    next();
  } catch (e) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};
