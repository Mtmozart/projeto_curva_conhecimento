import CreateUserDTO from "../DTO/userDTOs/CreateUserDTO";
import UserEntity from "../entities/UserEntity";
import UserRepository from "../repositories/UserRepository";

export default class UserService {

  constructor(private userRepository: UserRepository){

  }

  async create(user: UserEntity): Promise<{ success: boolean; message?: string }>{
    const userAlreadyExist = await this.userRepository.findUserByEmail(user.email);

    if(userAlreadyExist.success === true) {
        return { success: false, message: "O e-mail já cadastrado." };
    }
    const newUser: UserEntity = user;
    await this.userRepository.createUser(newUser);
    return { success: true}


  }
}
