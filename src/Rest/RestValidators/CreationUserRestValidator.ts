import { Request } from "express";
import { ValidatorAnswerErrorMessage } from "../../Validators/DTOs/ValidatorAnswerErrorMessage";
import { Validator } from "../../Validators/Validator";

export class CreationUserRestValidator extends Validator<Request> {
    protected setValidations(): void {
        this.validations = [
            this.isUsernameEmpty,
            this.isPasswordEmpty
        ];
    }
    
    private async isUsernameEmpty(userInfo: Request): Promise<ValidatorAnswerErrorMessage | undefined>{
        if (!("username" in userInfo.body) || userInfo.body.username === "") {
            return { message: "username_empty" }
        }
        else {
            return undefined
        }
    }
    
    private async isPasswordEmpty(userInfo: Request): Promise<ValidatorAnswerErrorMessage | undefined>{
        if (!("password" in userInfo.body) || userInfo.body.password === "") {
            return { message: "password_empty" }
        }
        else {
            return undefined
        }
    }
}