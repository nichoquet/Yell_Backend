import { Schema } from "mongoose";
import { Message } from "./Message";

export class TextDiscussion {
    public _id: string;
    public messages: Array<Message>;

    public constructor (messages: Array<Message>, _id: string) {
        this.messages = messages;
        this._id = _id;
    }
}

export const TextDiscussionSchema = new Schema<TextDiscussion>({ messages: Array });