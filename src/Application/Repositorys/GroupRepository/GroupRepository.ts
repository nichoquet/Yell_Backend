import { Group } from "src/Domain/Models/Group";
import { CreateGroupInfoDTO } from "src/Rest/DTOs/CreateGroupInfoDTO";

export interface GroupRepository {
    getGroupById(id: string): Promise<Group>;
    getGroupByName(name: string): Promise<Group>;
    getAllGroupOfUser(name: string): Promise<Array<Group>>;
    getAllGroups(): Promise<Array<Group>>;
    createGroup(groupInfo: CreateGroupInfoDTO): Promise<string>;
    updateGroup(group: Group): Promise<Group>;
    deleteGroup(id: string): Promise<void>;
}