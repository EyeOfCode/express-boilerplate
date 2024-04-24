import { Request, Response } from "express";

import UserService from "../../services/user.service";
import { User } from "../../models/user.model";
import { Types } from "mongoose";
import AuthService from "../../services/auth.service";

export default class UserController {
  private userService: UserService;
  private authService: AuthService;

  constructor() {
    this.userService = new UserService(User);
    this.authService = new AuthService();
  }

  async getUser(_req: Request, res: Response) {
    const data = await this.userService.find();
    return res.status(200).json(data);
  }

  async createUser(req: Request, res: Response) {
    const user = req.body;
    const checkUser = await this.userService.findOne({ name: user.name });
    if (checkUser) {
      return res.status(400).send({ message: "User already exists" });
    }
    const hashPassword = await this.authService.hashPassword(user.password);
    delete user.password;
    const data = await this.userService.create({
      ...user,
      password: hashPassword,
    });
    return res.status(200).json(data);
  }

  async getUserById(req: Request, res: Response) {
    const data = await this.userService.findById(
      req.params.id as unknown as Types.ObjectId
    );
    return res.status(200).json(data);
  }

  async updateUser(req: Request, res: Response) {
    const payload = req.body;
    delete payload.password;
    const data = await this.userService.update(
      req.params.id as unknown as Types.ObjectId,
      payload
    );
    return res.status(200).json(data);
  }

  async deleteUser(req: Request, res: Response) {
    const user = await this.userService.findById(
      req.params.id as unknown as Types.ObjectId
    );
    if (!user) {
      return res.status(400).send({ message: "User not found!!" });
    }
    await this.userService.delete(req.params.id as unknown as Types.ObjectId);
    return res.status(200).json({ message: "Success to deleted!!" });
  }
}
