import { UserRepository } from "../../Application/Repositorys/UserRepository/UserRepository";
import { CreateGroupInfoDTO } from "../../Rest/DTOs/CreateGroupInfoDTO";
import { ValidatorAnswerErrorMessage } from "../../Validators/DTOs/ValidatorAnswerErrorMessage";
import { Validator } from "../../Validators/Validator";
import { User } from "../Models/User";

export class CreationGroupDomainValidator extends Validator<CreateGroupInfoDTO> {
    private userRepository: UserRepository;

    public constructor (userRepository: UserRepository) {
        super();
        this.userRepository = userRepository;
    }

    public setValidations(): void {
        super.validations = [
            this.doesOwnerExist.bind(this),
            this.doesMembersExists.bind(this),
            this.isOwnerInMembersList.bind(this),
            this.doesMemberListHaveDuplicates.bind(this)
        ];
    }

    public doesOwnerExist (groupInfo: CreateGroupInfoDTO): Promise<undefined | ValidatorAnswerErrorMessage> {
        return new Promise((resolve) => {
            this.userRepository.getUserById(groupInfo.owner).then(() => {
                resolve(undefined);
            }).catch(() => {
                resolve({ message: "user_not_found" });
            })
        });
    }

    public doesMembersExists (groupInfo: CreateGroupInfoDTO): Promise<undefined | ValidatorAnswerErrorMessage> {
        return new Promise(async (resolve) => {
            // const gettingUserFunctions = new Array<() => Promise<User>>();
            let allMembersExist = true;
            for (let x = 0; x < groupInfo.members.length; x++) {
                const member = groupInfo.members[x];
                try {
                    await this.userRepository.getUserById(member.user)
                } catch (error) {
                    allMembersExist = false;
                }
            }
            if (allMembersExist) {
                resolve(undefined);
            }
            else {
                resolve({ message: "user_not_found" });
            }
        });
    }

    public isOwnerInMembersList (groupInfo: CreateGroupInfoDTO): Promise<undefined | ValidatorAnswerErrorMessage> {
        return new Promise((resolve) => {
            if (groupInfo.members.some(member => member.user === groupInfo.owner)) {
                resolve(undefined);
            }
            else {
                resolve({ message: "owner_not_in_member_list" });
            }
        });
    }

    public doesMemberListHaveDuplicates (groupInfo: CreateGroupInfoDTO): Promise<undefined | ValidatorAnswerErrorMessage> {
        return new Promise((resolve) => {
            const members = new Set();
            let duplicateMember = "";
            groupInfo.members.forEach(member => {
                if (members.has(member.user)) {
                    duplicateMember = member.user;
                }
                members.add(member.user);
            })
            if (duplicateMember === "") {
                resolve(undefined);
            }
            else {
                resolve({ message: "duplicate_in_member_list", "meta": { duplicate: duplicateMember } });
            }
        });
    }
}