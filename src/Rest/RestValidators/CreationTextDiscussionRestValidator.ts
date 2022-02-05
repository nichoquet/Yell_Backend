import { Request } from "express";
import { isValidObjectId } from "mongoose";
import { ValidatorAnswerErrorMessage } from "../../Validators/DTOs/ValidatorAnswerErrorMessage";
import { Validator } from "../../Validators/Validator";

export class CreationTextDiscussionRestValidator extends Validator<Request> {
    protected setValidations(): void {
        this.validations = [
            this.isGroupEmpty,
            this.isNameEmpty,
            this.isGroupIdValid
        ];
    }
    
    private async isNameEmpty(req: Request): Promise<ValidatorAnswerErrorMessage | undefined>{
        if (!("name" in req.body) || req.body.name === "") {
            return { message: "name_empty" }
        }
        else {
            return undefined
        }
    }
    
    private async isGroupEmpty(req: Request): Promise<ValidatorAnswerErrorMessage | undefined>{
        if (!("group" in req.body) || req.body.group === "") {
            return { message: "group_empty" }
        }
        else {
            return undefined
        }
    }

    private async isGroupIdValid(req: Request): Promise<ValidatorAnswerErrorMessage | undefined>{
        if (!("group" in req.body) || req.body.group === "") {
            return undefined;
        }
        else if (!isValidObjectId(req.body.group)) {
            return { message: "group_id_not_valid" }
        }
        else {
            return undefined
        }
    }
}