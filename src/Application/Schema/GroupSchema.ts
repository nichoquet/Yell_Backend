import { Schema } from "mongoose";
import { Group } from "src/Domain/Models/Group";

export const GroupSchema = new Schema<Group>({
    name: String,
    owner: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    members: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    textDiscussions: [
        {
            type: Schema.Types.ObjectId,
            ref: "TextDiscussion"
        }
    ]
});