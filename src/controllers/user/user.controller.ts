import { Request, Response } from "express";
import { Model } from "mongoose";
import UserService from "../../services/user.service";
import { User } from "../../models/user.model";

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(User);
  }

  async getUser(_req: Request, res: Response) {
    const data = await this.userService.find();
    return res.status(200).json(data);
  }
}
