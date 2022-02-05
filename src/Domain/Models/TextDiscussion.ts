import { Schema } from "mongoose";
import { Group } from "./Group";
import { Message } from "./Message";

export class TextDiscussion {
    public _id: string;
    public messages: Array<Message>;
    public group: Group;

    public constructor (messages: Array<Message>, _id: string, group: Group) {
        this.messages = messages;
        this._id = _id;
        this.group = group;
    }
}

export const TextDiscussionSchema = new Schema<TextDiscussion>({ messages: Array, group: { type: Schema.Types.ObjectId, ref: "Group" } });