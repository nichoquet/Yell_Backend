import { Group } from "./Group";
import { Message } from "./Message";

export class TextDiscussion {
    public _id: string;
    public messages: Array<Message>;
    public group: Group;
    public name: string;

    public constructor (name: string, messages: Array<Message>, _id: string, group: Group) {
        this.messages = messages;
        this._id = _id;
        this.group = group;
        this.name = name;
    }
}