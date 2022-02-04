import { CreateUserInfoDTO } from "src/Rest/DTOs/CreateUserInfoDTO";
import { User } from "src/Domain/Models/User";
import { UserRepository } from "src/Application/Repositorys/UserRepository/UserRepository";
import { CreationUserDomainValidatior } from "../DomainValidators/CreationUserDomainValidatior";

export class UserService {
    private userRepository: UserRepository;
    private creationUserValidatior: CreationUserDomainValidatior;
    public constructor (userRepository: UserRepository, creationUserValidatior: CreationUserDomainValidatior) {
        this.userRepository = userRepository;
        this.creationUserValidatior = creationUserValidatior;
    }
    create (userInfo: CreateUserInfoDTO): Promise<string> {
        return new Promise(async (resolve, reject) => {
            this.creationUserValidatior.validate(userInfo).then(() => {
                this.userRepository.createUser(userInfo).then((userId) => {
                    resolve(userId);
                })

            }).catch((validatorResponse) => {
                reject(validatorResponse);
            })
        })
    }
    getById (id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.userRepository.getUserById(id).then((user) => {
                resolve(user);
            }).catch(() => {
                reject("not_found");
            })
        })
    }
}