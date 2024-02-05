import { Repository } from "typeorm";
import UserEntity from "../entities/UserEntity";
import IUserRepository from "./interfaces/IUserRepository";

export default class UserRepository implements IUserRepository{

   private  repository:Repository<UserEntity>;

   constructor(repository: Repository<UserEntity>){}

  async createUser(user: UserEntity): Promise<void> {
    await this.repository.create(user);
  }


}
