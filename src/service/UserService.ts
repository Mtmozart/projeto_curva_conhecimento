import CreateUserDTO from "../DTO/userDTOs/CreateUserDTO";
import CreateUserDTOResponse from "../DTO/userDTOs/CreateUserDTOResponse";
import LoginUserDTO from "../DTO/userDTOs/LoginUserDTO";
import UpdateUserDTO from "../DTO/userDTOs/UpdateUserDTO";
import UserDetailsDTO from "../DTO/userDTOs/UserDetailsDTO";
import UserEntity from "../entities/UserEntity";
import UserRepository from "../repositories/UserRepository";
import AuthenticationJWT from "../security/authentication/AuthenticationJWT";
import Encryptions from "../security/encryption/encryptions";


export default class UserService {

  private encryptions: Encryptions = new Encryptions();
  private authToken = new AuthenticationJWT();

  constructor(private userRepository: UserRepository){

  }

  async create(dados: CreateUserDTO): Promise<{ success: boolean; message?: string, user?: CreateUserDTOResponse}>{
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

   const userCreated =  await this.userRepository.createUser(newUser);


   const userResponse: CreateUserDTOResponse ={
    id: userCreated.newUser.id.toString(),
    name: userCreated.newUser.name,
    email: userCreated.newUser.email,

  }

    return { success: true, user: userResponse };
  }

  async login(dados: LoginUserDTO): Promise<{ success: boolean; message?: string, user?: LoginUserDTO }> {

    const user = await this.userRepository.findUserByEmailDatas(dados.email);


    if(!user || !user.datas || !user.datas.password){
      return { success: false, message: "Credenciais inválida." };
    }

    const verificationPassword = await this.encryptions.decode(dados.password, user.datas.password);

    if(!verificationPassword.success){
      return { success: false, message: "Credenciais inválida." };
    }

    const id = user.datas.id.toString()

    const userLogin: LoginUserDTO = {
      id: id,
      name: user.datas.name,
      email: user.datas.email,
      password: user.datas.password
    }


    return { success: true, user: userLogin }
  }



  async details(id: number): Promise<{
    success: boolean;
    message?: string;
    user?: UserDetailsDTO;
}> {
    const { user } = await this.userRepository.findUserById(id);

    if (!user) {
        return { success: false, message: "Id inválido." };
    }

    return { success: true, user };
}

async update(id: number, token: string, newData: UpdateUserDTO): Promise<{
  success: boolean;
  message?: string;
  user?: UpdateUserDTO;
}> {

  const userToken = await this.authToken.verify(token);


  const { datas }= await this.userRepository.findUserByEmailDatas(userToken.email);


  if(!datas){
    return { success: false, message: "Id inválido." };
   }

   if(datas.id!= id || datas.id == null){

    return { success: false, message: "Id inválido." };
   }


   Object.assign(datas, newData);

   await this.userRepository.updateUser(datas);

  return { success: true };
}
}
