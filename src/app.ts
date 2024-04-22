import express, { Application } from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import Server from "./server";

import userRouter from "./routers/user.route";

const app: Application = express();
new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
app.use(json());

mongoose
  .connect(process.env.DB_MONGO_URI!)
  .then(() => console.log("MongoDB Connected!!"))
  .catch((err) => console.log(err));

app.use("/user", userRouter);

app
  .listen(PORT, () => console.log(`Server is started at port ${PORT}`))
  .on("error", (err: any) => {
    console.log(err);
  });
