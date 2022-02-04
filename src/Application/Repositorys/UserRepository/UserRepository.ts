import { User } from "src/Domain/Models/User";
import { CreateUserInfoDTO } from "src/Rest/DTOs/CreateUserInfoDTO";

export interface UserRepository {
    getUserById(id: string): Promise<User>;
    getUserByUsername(username: string): Promise<User>;
    getAllUsers(): Promise<Array<User>>;
    createUser(user: CreateUserInfoDTO): Promise<string>;
    updateUser(user: User): Promise<User>;
    deleteUser(id: string): Promise<void>;
}