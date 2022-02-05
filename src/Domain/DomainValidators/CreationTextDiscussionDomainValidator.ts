import { GroupRepository } from "src/Application/Repositorys/GroupRepository/GroupRepository";
import { CreateTextDiscussionInfoDTO } from "src/Rest/DTOs/CreateTextDiscussionInfoDTO";
import { ValidatorAnswerErrorMessage } from "../../Validators/DTOs/ValidatorAnswerErrorMessage";
import { Validator } from "../../Validators/Validator";

export class CreationTextDiscussionDomainValidator extends Validator<CreateTextDiscussionInfoDTO> {
    private groupRepository: GroupRepository;

    public constructor (groupRepository: GroupRepository) {
        super();
        this.groupRepository = groupRepository;
    }

    public setValidations(): void {
        super.validations = [
            this.doesGroupExist.bind(this)
        ];
    }

    public doesGroupExist (textDiscussionInfo: CreateTextDiscussionInfoDTO): Promise<undefined | ValidatorAnswerErrorMessage> {
        return new Promise((resolve) => {
            this.groupRepository.getGroupById(textDiscussionInfo.group).then(() => {
                resolve(undefined);
            }).catch(() => {
                resolve({ message: "group_not_found" });
            })
        });
    }
}