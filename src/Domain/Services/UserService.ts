import { CreateUserInfoDTO } from "src/Rest/DTOs/CreateUserInfoDTO";
import { User } from "src/Domain/Models/User";
import { UserRepository } from "src/Application/Repositorys/UserRepository/UserRepository";
import { CreationUserDomainValidator } from "../DomainValidators/CreationUserDomainValidator";

export class UserService {
    private userRepository: UserRepository;
    private creationUserDomainValidator: CreationUserDomainValidator;
    public constructor (userRepository: UserRepository, creationUserDomainValidator: CreationUserDomainValidator) {
        this.userRepository = userRepository;
        this.creationUserDomainValidator = creationUserDomainValidator;
    }
    create (userInfo: CreateUserInfoDTO): Promise<string> {
        return new Promise(async (resolve, reject) => {
            this.creationUserDomainValidator.validate(userInfo).then(() => {
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