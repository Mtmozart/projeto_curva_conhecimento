import UserDetailsDTO from "../../DTO/userDTOs/UserDetailsDTO";
import UserEntity from "../../entities/UserEntity";

export default interface IUserRepository {

    createUser(user: UserEntity): null | Promise<{newUser: UserEntity}>;
    findUserByEmail(email: string): Promise<{ success: boolean; message?: string }>
    findUserByEmailDatas(email: string): Promise<{datas: UserEntity | null}>
    findUserById(id: number): Promise<{user: UserEntity | null}>
    updateUser(user: UserEntity): Promise<{ success: boolean; message?: string }>
}
