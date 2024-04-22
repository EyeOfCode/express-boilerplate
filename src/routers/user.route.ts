import { Router } from "express";
import UserController from "../controllers/user/user.controller";

class UserRoutes {
  router = Router();
  controller = new UserController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", (req, res) => this.controller.getUser(req, res));
  }
}

export default new UserRoutes().router;
