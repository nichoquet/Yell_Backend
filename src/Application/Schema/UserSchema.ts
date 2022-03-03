import { Schema } from "mongoose";
import { User } from "src/Domain/Models/User";

export const UserSchema = new Schema<User>({ username: String, password: { type: String, select: false }, token: String });