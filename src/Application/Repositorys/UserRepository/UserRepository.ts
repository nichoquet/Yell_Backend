import { User } from "src/Domain/Models/User";
import { CreateUserInfoDTO } from "src/Rest/DTOs/CreateUserInfoDTO";

export interface UserRepository {
    getUserById(id: string): Promise<User>;
    getUserByUsername(username: string): Promise<User>;
    getUserByOathToken(token: string): Promise<User>;
    getUserHashedPasswordByUsername(username: string): Promise<string>;
    getUserOathToken(username: string): Promise<string>;
    getAllUsers(): Promise<Array<User>>;
    createUser(user: CreateUserInfoDTO): Promise<string>;
    updateUser(user: User): Promise<User>;
    deleteUser(id: string): Promise<void>;
}