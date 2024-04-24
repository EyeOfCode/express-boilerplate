import { Types } from "mongoose";

export interface IJwtPayload {
  _id: Types.ObjectId;
  iat: number;
  exp: number;
}
