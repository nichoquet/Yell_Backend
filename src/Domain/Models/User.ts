import { Schema } from "mongoose";

export class User {
    public _id: string;
    public username: string;
    public password: string;

    public constructor (_id: string, username: string, password: string) {
        this._id = _id;
        this.username = username;
        this.password = password;
    }
}

export const UserSchema = new Schema<User>({ username: String, password: { type: String, select: false } });