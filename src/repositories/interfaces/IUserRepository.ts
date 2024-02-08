import UserEntity from "../../entities/UserEntity";

export default interface IUserRepository {

    createUser(user: UserEntity): void | Promise<void>;
    findUserByEmail(email: string): Promise<UserEntity | null>
}
