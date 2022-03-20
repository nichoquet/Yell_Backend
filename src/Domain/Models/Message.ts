import { User } from "./User";

export class Message {
    public user: User;
    public message: string;

    public constructor (message: string, user: User) {
        this.message = message;
        this.user = user;
    }
}