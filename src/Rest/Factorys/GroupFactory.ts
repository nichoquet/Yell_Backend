import { Request } from "express";
import { CreateGroupInfoDTO } from "../DTOs/CreateGroupInfoDTO";
import { CreationGroupRestValidator } from "../RestValidators/CreationGroupRestValidator";

export class GroupFactory {
    private creationGroupRestValidator: CreationGroupRestValidator;
    public constructor (creationGroupRestValidator: CreationGroupRestValidator) {
        this.creationGroupRestValidator = creationGroupRestValidator;
    }
    public fromCreateRequest (req: Request): Promise<CreateGroupInfoDTO> {
        return new Promise((resolve, reject) => {
            if (req.body === undefined) {
                reject(["empty_body"])
            }
            else {
                this.creationGroupRestValidator.validate(req).then(() => {
                    const owner = req.body.owner;
                    const name = req.body.name;
                    const members = req.body.members;
                    const group = { owner, name, members }
                    resolve(group);
                }).catch((errorList) => {
                    reject(errorList);
                })
            }
        })
    }
}