import { TextDiscussion } from "../../../Domain/Models/TextDiscussion";
import { CreateTextDiscussionInfoDTO } from "../../../Rest/DTOs/CreateTextDiscussionInfoDTO";
import { ModelsHandler } from "../../../ModelsHandler";
import { TextDiscussionRepository } from "./TextDiscussionRepository";
import { TextDiscussionSchema } from "../../../Application/Schema/TextDiscussionSchema";

export class MongoDBTextDiscussionRepository implements TextDiscussionRepository {
    private modelsHandler: ModelsHandler;
    public constructor (modelsHandler: ModelsHandler) {
        this.modelsHandler = modelsHandler;
    }
    getTextDiscussionById(id: string): Promise<TextDiscussion> {
        return new Promise((resolve, reject) => {
            this.modelsHandler.getObject<TextDiscussion>("TextDiscussion", id, TextDiscussionSchema).then((textDiscussion) => {
                if (textDiscussion === null) {
                    reject("not_found")
                }
                else {
                    textDiscussion.populate("group").then((textDiscussionWithFroup) => {
                        resolve(textDiscussionWithFroup);
                    }).catch(error => {
                        console.log(error)
                        reject(error)
                    })
                }
            });
        });
    }
    getAllTextDiscussion(): Promise<TextDiscussion[]> {
        return new Promise((resolve) => {
            this.modelsHandler.getAllObjects<TextDiscussion>("TextDiscussion", TextDiscussionSchema).then((textDiscussionsList) => {
                resolve(textDiscussionsList);
            });
        });
    }
    createTextDiscussion(textDiscussionInfo: CreateTextDiscussionInfoDTO): Promise<string> {
        return new Promise(async (resolve) => {
            const textDiscussionId = await this.modelsHandler.createNewObject<TextDiscussion>("TextDiscussion", textDiscussionInfo, TextDiscussionSchema);
            resolve(textDiscussionId);
        });
    }
    updateTextDiscussion(textDiscussion: TextDiscussion): Promise<TextDiscussion> {
        throw new Error("Method not implemented.");
    }
    deleteTextDiscussion(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}