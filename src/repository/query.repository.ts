import { Types } from "mongoose";

export abstract class QueryRepository {
  abstract find(): Promise<any>;

  abstract findById(id: Types.ObjectId): Promise<any>;
}
