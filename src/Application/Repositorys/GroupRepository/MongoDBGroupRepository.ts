import { Group } from "../../../Domain/Models/Group";
import { ModelsHandler } from "../../..//ModelsHandler";
import { CreateGroupInfoDTO } from "../../../Rest/DTOs/CreateGroupInfoDTO";
import { GroupRepository } from "./GroupRepository";
import { GroupSchema } from "../../../Application/Schema/GroupSchema";
import { HydratedDocument } from "mongoose";

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
                    group.populate("textDiscussions").then((groupWithTextDiscussion) => {
                        resolve(groupWithTextDiscussion);
                    })
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
    updateGroup(group: HydratedDocument<Group>): Promise<Group> {
        return new Promise(async (resolve) => {
            await group.save()
            resolve(group);
        });
    }
    deleteGroup(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}