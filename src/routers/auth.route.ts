import { Router } from "express";
import AuthController from "../controllers/auth/auth.controller";
import { AuthValidation } from "../validators/auth.validator";
import { AuthMiddleware } from "../middleware/auth.middleware";

class AuthRoutes {
  router = Router();
  controller = new AuthController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/login", AuthValidation, (req, res) =>
      this.controller.login(req, res)
    );

    this.router.get("/", AuthMiddleware, (req, res) =>
      this.controller.getInfo(req, res)
    );
  }
}

export default new AuthRoutes().router;
