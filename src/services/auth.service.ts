import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { IJwtPayload } from "../controllers/auth/interface/jwt.interface";

export default class AuthService {
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async checkPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compareSync(password, hashedPassword);
  }

  verifyToken(token: string): IJwtPayload | null {
    const decode = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.TOKEN_SECRET || ""
    ) as JwtPayload;
    if (!decode) {
      return null;
    }
    return decode as IJwtPayload;
  }

  signToken(id: Types.ObjectId): string {
    return jwt.sign({ _id: id }, process.env.TOKEN_SECRET || "", {
      expiresIn: "1 days",
    });
  }
}
