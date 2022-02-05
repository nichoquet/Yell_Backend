import { GroupRepository } from "src/Application/Repositorys/GroupRepository/GroupRepository";
import { CreateGroupInfoDTO } from "src/Rest/DTOs/CreateGroupInfoDTO";
import { CreationGroupDomainValidator } from "../DomainValidators/CreationGroupDomainValidator";
import { Group } from "../Models/Group";

export class GroupService {
    private groupRepository: GroupRepository;
    private creationGroupDomainValidator: CreationGroupDomainValidator;
    public constructor (groupRepository: GroupRepository, creationGroupDomainValidator: CreationGroupDomainValidator) {
        this.groupRepository = groupRepository;
        this.creationGroupDomainValidator = creationGroupDomainValidator;
    }
    create (groupInfo: CreateGroupInfoDTO): Promise<string> {
        return new Promise(async (resolve, reject) => {
            this.creationGroupDomainValidator.validate(groupInfo).then(() => {
                this.groupRepository.createGroup(groupInfo).then((groupId) => {
                    resolve(groupId);
                })
            }).catch((validatorResponse) => {
                reject(validatorResponse);
            })
        })
    }
    getById (id: string): Promise<Group> {
        return new Promise((resolve, reject) => {
            this.groupRepository.getGroupById(id).then((group) => {
                resolve(group);
            }).catch(() => {
                reject("not_found");
            })
        })
    }
}