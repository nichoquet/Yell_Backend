import { Schema } from "mongoose";
import { GroupMember } from "./GroupMember";
import { TextDiscussion } from "./TextDiscussion";
import { User } from "./User";

export class Group {
    public _id: string;
    public name: string;
    public members: Array<GroupMember>
    public owner: User;
    public textDiscussions: Array<TextDiscussion>;

    public constructor (name: string, owner: User, members: Array<GroupMember>, textDiscussions: Array<TextDiscussion>) {
        this.name = name;
        this.owner = owner;
        this.members = members;
        this.textDiscussions = textDiscussions;
    }
}
export const GroupSchema = new Schema<Group>({ name: String, owner: { type: Schema.Types.ObjectId, ref: "User" }, members: [{ user: { type: Schema.Types.ObjectId, ref: "User" }}], textDiscussions: [{ type: String, ref: "TextDiscussion" }] });