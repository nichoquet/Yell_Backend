import { TextDiscussion } from "src/Domain/Models/TextDiscussion";
import { CreateTextDiscussionInfoDTO } from "src/Rest/DTOs/CreateTextDiscussionInfoDTO";
import { TextDiscussionMessageDTO } from "src/Rest/DTOs/TextDiscussionMessageDTO";

export interface TextDiscussionRepository {
    getTextDiscussionById(id: string): Promise<TextDiscussion>;
    getTextDiscussionByIdWithGroup(id: string): Promise<TextDiscussion>;
    getAllTextDiscussion(): Promise<Array<TextDiscussion>>;
    createTextDiscussion(groupInfo: CreateTextDiscussionInfoDTO): Promise<string>;
    updateTextDiscussion(group: TextDiscussion): Promise<TextDiscussion>;
    addMessageToTextDiscussion(id: string, message: TextDiscussionMessageDTO): Promise<void>;
    deleteTextDiscussion(id: string): Promise<void>;
}