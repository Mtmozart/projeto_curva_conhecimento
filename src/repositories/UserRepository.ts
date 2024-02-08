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

    async findUserByEmail(email: string): Promise<boolean>{
        const user: UserEntity | undefined = await this.repository.findOne({
          where:{
            email: email
          }
        })
        if(user){
          return true
        }

      return false;
    }

}
