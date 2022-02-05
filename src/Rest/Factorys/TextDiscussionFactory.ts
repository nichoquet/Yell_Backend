import { Request } from "express";
import { CreateTextDiscussionInfoDTO } from "../DTOs/CreateTextDiscussionInfoDTO";
import { CreationTextDiscussionRestValidator } from "../RestValidators/CreationTextDiscussionRestValidator";

export class TextDiscussionFactory {
    private creationTextDiscussionRestValidator: CreationTextDiscussionRestValidator;
    public constructor (creationTextDiscussionRestValidator: CreationTextDiscussionRestValidator) {
        this.creationTextDiscussionRestValidator = creationTextDiscussionRestValidator;
    }
    public fromCreateRequest (req: Request): Promise<CreateTextDiscussionInfoDTO> {
        return new Promise((resolve, reject) => {
            if (req.body === undefined) {
                reject(["empty_body"])
            }
            else {
                this.creationTextDiscussionRestValidator.validate(req).then(() => {
                    const group = req.body.group;
                    const name = req.body.name;
                    const textDiscussion = { name, group }
                    resolve(textDiscussion);
                }).catch((errorList) => {
                    reject(errorList);
                })
            }
        })
    }
}