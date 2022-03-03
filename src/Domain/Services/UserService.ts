import { CreateUserInfoDTO } from "src/Rest/DTOs/CreateUserInfoDTO";
import { User } from "src/Domain/Models/User";
import { UserRepository } from "src/Application/Repositorys/UserRepository/UserRepository";
import { CreationUserDomainValidator } from "../DomainValidators/CreationUserDomainValidator";
import { LoginUserInfoDTO } from "src/Rest/DTOs/LoginUserInfoDTO";
import { AuthentificationService } from "./AuthentificationService";

export class UserService {
    private userRepository: UserRepository;
    private creationUserDomainValidator: CreationUserDomainValidator;
    private authentificationService: AuthentificationService;
    public constructor (userRepository: UserRepository, creationUserDomainValidator: CreationUserDomainValidator, authentificationService: AuthentificationService) {
        this.userRepository = userRepository;
        this.creationUserDomainValidator = creationUserDomainValidator;
        this.authentificationService = authentificationService;
    }
    create (userInfo: CreateUserInfoDTO): Promise<string> {
        return new Promise(async (resolve, reject) => {
            this.creationUserDomainValidator.validate(userInfo).then(() => {
                userInfo.token = this.authentificationService.createNewOathToken();
                this.userRepository.createUser(userInfo).then((userId) => {
                    resolve(userId);
                })

            }).catch((validatorResponse) => {
                reject(validatorResponse);
            })
        })
    }
    login (userInfo: LoginUserInfoDTO): Promise<string> {
        return new Promise(async (resolve, reject) => {
            this.authentificationService.login(userInfo).then(token => {
                resolve(token);
            }).catch(err => {
                reject(err);
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