import { UserRepository } from "src/Application/Repositorys/UserRepository/UserRepository";
import { PasswordEncryptionTool } from "src/Encryption/PasswordEncryptionTool";
import { LoginUserInfoDTO } from "src/Rest/DTOs/LoginUserInfoDTO";
import { RandomStringGenerator } from "../Generators/RandomStringGenerator";
import { User } from "../Models/User";

export class AuthentificationService {
    private userRepository: UserRepository;
    private randomStringGenerator: RandomStringGenerator;
    private passwordEncryptionTool: PasswordEncryptionTool;
    public loggedInUser: User | undefined;
    public constructor (userRepository: UserRepository, randomStringGenerator: RandomStringGenerator, passwordEncryptionTool: PasswordEncryptionTool) {
        this.userRepository = userRepository;
        this.randomStringGenerator = randomStringGenerator;
        this.passwordEncryptionTool = passwordEncryptionTool;
    }
    login (userInfo: LoginUserInfoDTO): Promise<string> {
        return new Promise((resolve, reject) => {
            this.userRepository.getUserHashedPasswordByUsername(userInfo.username).then(async (hashedUserPassword) => {
                const isSamePassword = await this.passwordEncryptionTool.comparePassword(userInfo.password, hashedUserPassword);
                if (isSamePassword) {
                    const token = this.userRepository.getUserOathToken(userInfo.username);
                    resolve(token);
                }
                else {
                    reject("not_found");
                }
            }).catch(err => {
                reject("not_found");
            })
        })
    }
    createNewOathToken () {
        return this.randomStringGenerator.getRandomString(50);
    }
    getUserFromOathToken (token: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.userRepository.getUserByOathToken(token).then(async (user) => {
                resolve(user);
            }).catch(err => {
                reject("not_found");
            })
        })
    }
}