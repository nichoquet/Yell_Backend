import { Request } from "express";
import { isValidObjectId } from "mongoose";
import { ValidatorAnswerErrorMessage } from "../../Validators/DTOs/ValidatorAnswerErrorMessage";
import { Validator } from "../../Validators/Validator";

export class CreationGroupRestValidator extends Validator<Request> {
    protected setValidations(): void {
        this.validations = [
            this.isOwnerEmpty,
            this.isNameEmpty,
            this.isMembersEmpty,
            this.areMembersIdsValid,
            this.isOwnerIdValid
        ];
    }
    
    private async isOwnerEmpty(groupInfo: Request): Promise<ValidatorAnswerErrorMessage | undefined>{
        if (!("owner" in groupInfo.body) || groupInfo.body.owner === "") {
            return { message: "owner_empty" }
        }
        else {
            return undefined
        }
    }
    
    private async isNameEmpty(groupInfo: Request): Promise<ValidatorAnswerErrorMessage | undefined>{
        if (!("name" in groupInfo.body) || groupInfo.body.name === "") {
            return { message: "name_empty" }
        }
        else {
            return undefined
        }
    }
    
    private async isMembersEmpty(groupInfo: Request): Promise<ValidatorAnswerErrorMessage | undefined>{
        if (!("members" in groupInfo.body) || groupInfo.body.members.length === 0) {
            return { message: "members_empty" }
        }
        else {
            return undefined
        }
    }
    private async areMembersIdsValid(groupInfo: Request): Promise<ValidatorAnswerErrorMessage | undefined>{
        if (!("members" in groupInfo.body) || groupInfo.body.members.length === 0) {
            return undefined;
        }
        else if (groupInfo.body.members.some((member: any) => !isValidObjectId(member.user))) {
            return { message: "member_id_not_valid" }
        }
        else {
            return undefined
        }
    }

    private async isOwnerIdValid(groupInfo: Request): Promise<ValidatorAnswerErrorMessage | undefined>{
        if (!("owner" in groupInfo.body) || groupInfo.body.owner === "") {
            return undefined;
        }
        else if (!isValidObjectId(groupInfo.body.owner)) {
            return { message: "owner_id_not_valid" }
        }
        else {
            return undefined
        }
    }
}