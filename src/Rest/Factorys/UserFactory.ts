import { Request } from "express";
import { PasswordEncryptionTool } from "src/Encryption/PasswordEncryptionTool";
import { CreateUserInfoDTO } from "../DTOs/CreateUserInfoDTO";
import { LoginUserInfoDTO } from "../DTOs/LoginUserInfoDTO";
import { CreationUserRestValidator } from "../RestValidators/CreationUserRestValidator";
import { LoginUserRestValidator } from "../RestValidators/LoginUserRestValidator";

export class UserFactory {
    private passwordEncryptionTool: PasswordEncryptionTool;
    private creationUserRestValidator: CreationUserRestValidator;
    private loginUserRestValidator: LoginUserRestValidator;
    public constructor (passwordEncryptionTool: PasswordEncryptionTool, creationUserRestValidator: CreationUserRestValidator, loginUserRestValidator: LoginUserRestValidator) {
        this.creationUserRestValidator = creationUserRestValidator;
        this.passwordEncryptionTool = passwordEncryptionTool;
        this.loginUserRestValidator = loginUserRestValidator;
    }
    public fromCreateRequest (req: Request): Promise<CreateUserInfoDTO> {
        return new Promise((resolve, reject) => {
            if (req.body === undefined) {
                reject(["empty_body"])
            }
            else {
                this.creationUserRestValidator.validate(req).then(async () => {
                    const username = req.body.username;
                    const password = req.body.password;
                    const encryptedPassword = await this.passwordEncryptionTool.encryptPassword(password);
                    const user = { username, password: encryptedPassword }
                    resolve(user);
                }).catch((errorList) => {
                    reject(errorList);
                })
            }
        })
    }
    public fromLoginRequest (req: Request): Promise<LoginUserInfoDTO> {
        return new Promise((resolve, reject) => {
            if (req.body === undefined) {
                reject(["empty_body"])
            }
            else {
                this.loginUserRestValidator.validate(req).then(async () => {
                    const username = req.body.username;
                    const password = req.body.password;
                    // const encryptedPassword = await this.passwordEncryptionTool.encryptPassword(password);
                    const user = { username, password }
                    resolve(user);
                }).catch((errorList) => {
                    reject(errorList);
                })
            }
        })
    }
}