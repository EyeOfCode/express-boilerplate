import { Request, Response } from "express";

import { User } from "../../models/user.model";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import { IJwtPayload } from "./interface/jwt.interface";
import { IRequest } from "../../middleware/auth.middleware";

export default class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService(User);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.userService.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found!!" });
    }
    const checkPassword = await this.authService.checkPassword(
      password,
      user.password
    );
    if (!checkPassword) {
      return res.status(400).send({ message: "Invalid password!!" });
    }
    const token = this.authService.signToken(user._id);
    return res.status(200).json({ token });
  }

  async getInfo(req: IRequest, res: Response) {
    return res.status(200).json({ user: req.auth });
  }

  async verifyToken(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error();
    }
    const decoded = this.authService.verifyToken(
      token
    ) as unknown as IJwtPayload;
    if (!decoded) {
      throw new Error();
    }
    const user = await this.userService.findById(decoded._id);
    if (!user) {
      throw new Error();
    }
    return user;
  }
}
