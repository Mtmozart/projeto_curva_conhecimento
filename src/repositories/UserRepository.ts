import { Repository } from "typeorm";
import UserEntity from "../entities/UserEntity";
import IUserRepository from "./interfaces/IUserRepository";

export default class UserRepository implements IUserRepository{

   private  repository:Repository<UserEntity>;

   constructor(repository: Repository<UserEntity>){
    this.repository = repository;
   }


    async createUser(user: UserEntity): Promise<void> {

      await this.repository.save(user);
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

         throw new Error("Erro ao realizar o login" + error);


      }
    }

}
