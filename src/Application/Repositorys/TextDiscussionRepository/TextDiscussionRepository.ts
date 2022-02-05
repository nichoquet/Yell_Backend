import { TextDiscussion } from "src/Domain/Models/TextDiscussion";
import { CreateTextDiscussionInfoDTO } from "src/Rest/DTOs/CreateTextDiscussionInfoDTO";

export interface TextDiscussionRepository {
    getTextDiscussionById(id: string): Promise<TextDiscussion>;
    getAllTextDiscussion(): Promise<Array<TextDiscussion>>;
    createTextDiscussion(groupInfo: CreateTextDiscussionInfoDTO): Promise<string>;
    updateTextDiscussion(group: TextDiscussion): Promise<TextDiscussion>;
    deleteTextDiscussion(id: string): Promise<void>;
}