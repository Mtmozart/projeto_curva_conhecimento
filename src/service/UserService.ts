import CreateUserDTO from "../DTO/userDTOs/CreateUserDTO";
import LoginUserDTO from "../DTO/userDTOs/LoginUserDTO";
import UserEntity from "../entities/UserEntity";
import UserRepository from "../repositories/UserRepository";
import Encryptions from "../security/encryption/encryptions";

export default class UserService {

  private encryptions: Encryptions = new Encryptions();
  constructor(private userRepository: UserRepository){

  }

  async create(dados: CreateUserDTO): Promise<{ success: boolean; message?: string }>{
    const userAlreadyExist = await this.userRepository.findUserByEmail(dados.email);

    if(userAlreadyExist.success) {
        return { success: false, message: "O e-mail já cadastrado." };
    }
      //encriptação
      const hashedPassword = this.encryptions.encrypt(dados.password);

      const newUser: UserEntity = {
        name: dados.name,
        email: dados.email,
        password: hashedPassword
      };
    await this.userRepository.createUser(newUser);
    return { success: true}
  }

  async login(dados: LoginUserDTO): Promise<{ success: boolean; message?: string, user?: UserEntity }> {

    const user = await this.userRepository.findUserByEmailDatas(dados.email);


    if(!user || !user.datas || !user.datas.password){
      return { success: false, message: "Credenciais inválida." };
    }

    const verificationPassword = await this.encryptions.decode(dados.password, user.datas.password);


    if(!verificationPassword.success){
      return { success: false, message: "Credenciais inválida." };
    }

    return { success: true, user: user.datas }
  }
}
