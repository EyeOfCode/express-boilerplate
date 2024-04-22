import express, { Application } from "express";
import cors, { CorsOptions } from "cors";

import dotenv from "dotenv";
import Routes from "./routers";
dotenv.config();

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: process.env.BASE_URL,
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
