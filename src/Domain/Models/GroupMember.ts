import { User } from "./User";

export class GroupMember {
    public user: User;
    public constructor (user: User) {
        this.user = user;
    }
}