import { UserRepository } from "src/Application/Repositorys/UserRepository/UserRepository";
import { CreateUserInfoDTO } from "src/Rest/DTOs/CreateUserInfoDTO";
import { ValidatorAnswerErrorMessage } from "../../Validators/DTOs/ValidatorAnswerErrorMessage";
import { Validator } from "../../Validators/Validator";

export class CreationUserDomainValidatior extends Validator<CreateUserInfoDTO>{
    private userRepository: UserRepository;

    public constructor (userRepository: UserRepository) {
        super();
        this.userRepository = userRepository;
    }

    public setValidations(): void {
        super.validations = [
            this.isUsernameUnique.bind(this)
        ];
    }

    private async isUsernameUnique (user: CreateUserInfoDTO): Promise<undefined | ValidatorAnswerErrorMessage> {
        return new Promise((resolve) => {
            this.userRepository.getUserByUsername(user.username).then(() => {
                resolve({ message: "username_not_unique" });
            }).catch(() => {
                resolve(undefined);
            })
        });
    }
}