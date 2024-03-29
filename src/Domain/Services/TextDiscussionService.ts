import { GroupRepository } from "src/Application/Repositorys/GroupRepository/GroupRepository";
import { TextDiscussionRepository } from "src/Application/Repositorys/TextDiscussionRepository/TextDiscussionRepository";
import { UserRepository } from "src/Application/Repositorys/UserRepository/UserRepository";
import { CreateTextDiscussionInfoDTO } from "src/Rest/DTOs/CreateTextDiscussionInfoDTO";
import { TextDiscussionMessageDTO } from "src/Rest/DTOs/TextDiscussionMessageDTO";
import { CreationTextDiscussionDomainValidator } from "../DomainValidators/CreationTextDiscussionDomainValidator";
import { TextDiscussion } from "../Models/TextDiscussion";

export class TextDiscussionService {
    private textDiscussionRepository: TextDiscussionRepository;
    private groupRepository: GroupRepository;
    private userRepository: UserRepository;
    private creationTextDiscussionDomainValidator: CreationTextDiscussionDomainValidator;
    public constructor (textDiscussionRepository: TextDiscussionRepository, creationTextDiscussionDomainValidator: CreationTextDiscussionDomainValidator, groupRepository: GroupRepository, userRepository: UserRepository) {
        this.textDiscussionRepository = textDiscussionRepository;
        this.creationTextDiscussionDomainValidator = creationTextDiscussionDomainValidator;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }
    create (textDiscussionInfo: CreateTextDiscussionInfoDTO): Promise<string> {
        return new Promise(async (resolve, reject) => {
            this.creationTextDiscussionDomainValidator.validate(textDiscussionInfo).then(() => {
                this.textDiscussionRepository.createTextDiscussion(textDiscussionInfo).then((discussionId) => {
                    this.addTextDiscussionToGroup(discussionId).then(() => {
                        resolve(discussionId);
                    })
                })
            }).catch((validatorResponse) => {
                reject(validatorResponse);
            })
        })
    }

    async addMessageToDiscussion (textDiscussionId: string, message: string, userToken: string): Promise<void> {
        const user = await this.userRepository.getUserByOathToken(userToken);
        await this.textDiscussionRepository.addMessageToTextDiscussion(textDiscussionId, { message, user })
    }

    getById (id: string): Promise<TextDiscussion> {
        return new Promise((resolve, reject) => {
            this.textDiscussionRepository.getTextDiscussionByIdWithGroup(id).then((discussion) => {
                resolve(discussion);
            }).catch(() => {
                reject("not_found");
            })
        })
    }
    async addTextDiscussionToGroup (discussionId: string): Promise<void> {
        const discussion = await this.textDiscussionRepository.getTextDiscussionById(discussionId);
        const group = await this.groupRepository.getGroupById(discussion.group._id);
        group.textDiscussions.push(discussion);
        await this.groupRepository.updateGroup(group);
    }
}