import { Router } from "express";
import UserController from "../controllers/user/user.controller";
import { UserValidation } from "../validators/user.validator";
import { AuthMiddleware } from "../middleware/auth.middleware";

class UserRoutes {
  router = Router();
  controller = new UserController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", AuthMiddleware, (req, res) =>
      this.controller.getUser(req, res)
    );

    this.router.post("/", UserValidation, (req, res) =>
      this.controller.createUser(req, res)
    );

    this.router.get("/:id", (req, res) =>
      this.controller.getUserById(req, res)
    );

    this.router.put("/:id", AuthMiddleware, UserValidation, (req, res) =>
      this.controller.updateUser(req, res)
    );

    this.router.delete("/:id", (req, res) =>
      this.controller.deleteUser(req, res)
    );
  }
}

export default new UserRoutes().router;
