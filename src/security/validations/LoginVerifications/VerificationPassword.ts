import CreateUserDTO from "../../../DTO/userDTOs/CreateUserDTO";
import LoginUserDTO from "../../../DTO/userDTOs/LoginUserDTO";
import UserRepository from "../../../repositories/UserRepository";
import IVerification from "../IValidations";

export default class  VerificationPassword implements IVerification{

  constructor(private repository: UserRepository){

  }

 async verification(dados: LoginUserDTO): Promise<{ success: boolean; message?: string; }> {
    const user = await this.repository.findUserByEmailDatas(dados.email);



    if(!user){
      return { success: false, message: 'Verifique se o e-mail está correto.'}
    }

    return { success: true}
  }

}
