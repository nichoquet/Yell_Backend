import { User } from "../../../Domain/Models/User";
import { ModelsHandler } from "src/ModelsHandler";
import { CreateUserInfoDTO } from "src/Rest/DTOs/CreateUserInfoDTO";
import { UserRepository } from "./UserRepository";
import { UserSchema } from "../../../Application/Schema/UserSchema";

export class MongoDBUserRepository implements UserRepository {
    private modelsHandler: ModelsHandler;
    public constructor (modelsHandler: ModelsHandler) {
        this.modelsHandler = modelsHandler;
    }
    getUserByOathToken(token: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.modelsHandler.getObject<User>("User", token, UserSchema, "token").then((user) => {
                if (user === null) {
                    reject("not_found")
                }
                else {
                    resolve(user);
                }
            });
        });
    }
    getUserHashedPasswordByUsername(username: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.modelsHandler.getObject<User>("User", username, UserSchema, "username", ["password"]).then((user) => {
                if (user === null) {
                    reject("not_found")
                }
                else {
                    resolve(user.password);
                }
            });
        });
    }
    getUserOathToken(username: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.getUserByUsername(username).then(user => {
                resolve(user.token);
            }).catch(err => {
                reject(err);
            })
        });
    }
    getUserByUsername(username: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.modelsHandler.getObject<User>("User", username, UserSchema, "username").then((user) => {
                if (user === null) {
                    reject("not_found")
                }
                else {
                    resolve(user);
                }
            });
        });
    }
    getUserById(id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.modelsHandler.getObject<User>("User", id, UserSchema).then((user) => {
                if (user === null) {
                    reject("not_found")
                }
                else {
                    resolve(user);
                }
            });
        });
    }
    getAllUsers(): Promise<User[]> {
        return new Promise((resolve) => {
            this.modelsHandler.getAllObjects<User>("User", UserSchema).then((userList) => {
                resolve(userList);
            });
        });
    }
    createUser(userInfo: CreateUserInfoDTO): Promise<string> {
        return new Promise(async (resolve) => {
            const userId = await this.modelsHandler.createNewObject<User>("User", userInfo, UserSchema);
            resolve(userId);
        });
    }
    updateUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}