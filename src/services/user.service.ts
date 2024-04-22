import { Model, Types } from "mongoose";
import { IUser } from "../models/user.model";
import { QueryRepository } from "../repository/query.repository";

export default class UserService extends QueryRepository {
  constructor(private userModel: Model<IUser>) {
    super();
    this.find = this.find.bind(this);
    this.findById = this.findById.bind(this);
  }

  findById(id: Types.ObjectId): Promise<IUser | null> {
    return this.userModel.findById(id);
  }

  find(): Promise<IUser[]> {
    return this.userModel.find({});
  }
}
