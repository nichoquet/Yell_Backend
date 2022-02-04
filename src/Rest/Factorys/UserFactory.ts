import { Request } from "express";
import { PasswordEncryptionTool } from "src/Encryption/PasswordEncryptionTool";
import { CreateUserInfoDTO } from "../DTOs/CreateUserInfoDTO";
import { CreationUserRestValidator } from "../RestValidators/CreationUserRestValidator";

export class UserFactory {
    private passwordEncryptionTool: PasswordEncryptionTool;
    private creationUserRestValidator: CreationUserRestValidator;
    public constructor (passwordEncryptionTool: PasswordEncryptionTool, creationUserRestValidator: CreationUserRestValidator) {
        this.creationUserRestValidator = creationUserRestValidator;
        this.passwordEncryptionTool = passwordEncryptionTool;
    }
    public fromCreateRequest (req: Request): Promise<CreateUserInfoDTO> {
        return new Promise((resolve, reject) => {
            if (req.body === undefined) {
                reject(["empty_body"])
            }
            else {
                this.creationUserRestValidator.validate(req).then(() => {
                    const username = req.body.username;
                    const password = req.body.password;
                    const encryptedPassword = this.passwordEncryptionTool.encryptPassword(password);
                    const user = { username, password: encryptedPassword }
                    resolve(user);
                }).catch((errorList) => {
                    reject(errorList);
                })
            }
        })
    }
}