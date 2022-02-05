import { CreateGroupMemberInfoDTO } from "./CreateGroupMemberInfoDTO";

export interface CreateGroupInfoDTO {
    owner: string;
    name: string;
    members: Array<CreateGroupMemberInfoDTO>
}