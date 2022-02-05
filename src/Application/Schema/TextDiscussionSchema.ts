import { Schema } from "mongoose";
import { TextDiscussion } from "src/Domain/Models/TextDiscussion";

export const TextDiscussionSchema = new Schema<TextDiscussion>({ name: String, messages: Array, group: { type: Schema.Types.ObjectId, ref: "Group" } });
