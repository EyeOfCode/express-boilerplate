import { Model, Types } from "mongoose";

import { IUser } from "../models/user.model";

export default class UserService {
  constructor(private userModel: Model<IUser>) {
    this.find = this.find.bind(this);
    this.findById = this.findById.bind(this);
    this.findOne = this.findOne.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  async findById(id: Types.ObjectId): Promise<IUser | null> {
    return this.userModel.findById(id);
  }

  async find(query?: any): Promise<IUser[]> {
    return this.userModel.find(query || {});
  }

  async findOne(query?: any): Promise<IUser | null> {
    return this.userModel.findOne(query || {});
  }

  async create(user: IUser): Promise<IUser> {
    return this.userModel.create(user);
  }

  async update(id: Types.ObjectId, user: IUser): Promise<IUser | null> {
    return this.userModel.findByIdAndUpdate(id, user);
  }

  async delete(id: Types.ObjectId): Promise<null> {
    return this.userModel.findByIdAndDelete(id);
  }
}
