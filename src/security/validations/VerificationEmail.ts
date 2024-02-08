  import CreateUserDTO from "../../DTO/userDTOs/CreateUserDTO";
import UserRepository from "../../repositories/UserRepository";
  import IVerification from "./IValidations";

  export class VerificationEmail implements IVerification{

    constructor(private repository: UserRepository){

    }

    async verification(dados: CreateUserDTO): Promise<{ success: boolean; message?: string }> {
      if (dados.email === '' || dados.email === null) {
        return { success: false, message: "O campo do email está vazio." };
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(dados.email)) {
        return { success: false, message: "O e-mail é inválido." };
      }

      return { success: true}


    }


  }
