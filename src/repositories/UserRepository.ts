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

         if(user){
          return { success: true };
         }

         return { success: false}


        } catch (error) {
          return {
            success: false,
            message: "Erro: " + error,
          };
        }


    }

}
