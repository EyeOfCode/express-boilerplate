import { Application } from "express";
import userRoute from "./user.route";

export default class Routes {
  constructor(app: Application) {
    app.use("/user", userRoute);
  }
}
