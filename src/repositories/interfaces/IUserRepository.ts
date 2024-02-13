import UserEntity from "../../entities/UserEntity";

export default interface IUserRepository {

    createUser(user: UserEntity): void | Promise<void>;
    findUserByEmail(email: string): Promise<{ success: boolean; message?: string }>
    findUserByEmailDatas(email: string): Promise<{datas: UserEntity | null}>
}
