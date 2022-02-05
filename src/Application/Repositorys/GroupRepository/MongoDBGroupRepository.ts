import { Group, GroupSchema } from "../../../Domain/Models/Group";
import { ModelsHandler } from "../../..//ModelsHandler";
import { CreateGroupInfoDTO } from "../../../Rest/DTOs/CreateGroupInfoDTO";
import { GroupRepository } from "./GroupRepository";

export class MongoDBGroupRepository implements GroupRepository {
    private modelsHandler: ModelsHandler;
    public constructor (modelsHandler: ModelsHandler) {
        this.modelsHandler = modelsHandler;
    }
    getGroupById(id: string): Promise<Group> {
        return new Promise((resolve, reject) => {
            this.modelsHandler.getObject<Group>("Group", id, GroupSchema).then((group) => {
                if (group === null) {
                    reject("not_found")
                }
                else {
                    resolve(group);
                }
            });
        });
    }
    getGroupByName(name: string): Promise<Group> {
        return new Promise((resolve, reject) => {
            this.modelsHandler.getObject<Group>("Group", name, GroupSchema, "name").then((group) => {
                if (group === null) {
                    reject("not_found")
                }
                else {
                    resolve(group);
                }
            });
        });
    }
    getAllGroups(): Promise<Group[]> {
        return new Promise((resolve) => {
            this.modelsHandler.getAllObjects<Group>("Group", GroupSchema).then((groupList) => {
                resolve(groupList);
            });
        });
    }
    createGroup(groupInfo: CreateGroupInfoDTO): Promise<string> {
        return new Promise(async (resolve) => {
            const groupId = await this.modelsHandler.createNewObject<Group>("Group", groupInfo, GroupSchema);
            resolve(groupId);
        });
    }
    updateGroup(group: Group): Promise<Group> {
        throw new Error("Method not implemented.");
    }
    deleteGroup(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}