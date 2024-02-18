import { Repository } from "typeorm";
import UserEntity from "../entities/UserEntity";
import IUserRepository from "./interfaces/IUserRepository";
import UserDetailsDTO from "../DTO/userDTOs/UserDetailsDTO";

export default class UserRepository implements IUserRepository{

   private  repository:Repository<UserEntity>;

   constructor(repository: Repository<UserEntity>){
    this.repository = repository;
   }

    async createUser(user: UserEntity): Promise<{newUser: UserEntity}> {

      try {
        const newUser = await this.repository.save(user);
        return { newUser };
      } catch (error) {

        throw error;
      }
    }

    async findUserByEmail(email: string):Promise<{ success: boolean; message?: string }>{
        try {
          const user: UserEntity | undefined = await this.repository.findOneBy({
            email: email,
         })

         if(!user){
          return { success: false };
         }

         return { success: true}


        } catch (error) {
          return {
            success: false,
            message: "Erro: " + error,
          };
        }

    }

   async findUserByEmailDatas(email: string): Promise<{ datas: UserEntity; }> {
      try {
        const user: UserEntity | undefined = await this.repository.findOneBy({
          email: email,
       })

       if(!user){
        return {datas: null };
       }
       return { datas: user}

      } catch (error) {

         throw new Error("Erro ao consultar o usuário" + error);

      }
    }

    async findUserById(id: number): Promise<{ user: UserDetailsDTO | null; }> {

      try {
        const findUser: UserEntity = await this.repository.findOneBy({
          id: id,
       })

       if(!findUser){
        return {user: null };
       }

       const user = {
        id: findUser.id.toString(),
        name: findUser.name,
        email: findUser.email,
        password: findUser.password
       }

       return { user: user }


      } catch (error) {

         throw new Error("Erro ao realizar o login" + error);

      }
    }

  async  updateUser(user: UserEntity): Promise<{ success: boolean; message?: string; }> {
     const userUpdate = await this.repository.save(user)

     if(!userUpdate){
      return { success: false, message: "Falha ao atualizar o usuário."}
     }
     return { success: true }
    }
}
