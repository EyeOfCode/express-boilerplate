import { Application } from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";

export default class Routes {
  constructor(app: Application) {
    app.use("/user", userRoute);
    app.use("/auth", authRoute);
  }
}
