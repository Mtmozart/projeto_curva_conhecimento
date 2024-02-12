  import CreateUserDTO from "../../DTO/userDTOs/CreateUserDTO";
import LoginUserDTO from "../../DTO/userDTOs/LoginUserDTO";
import UserRepository from "../../repositories/UserRepository";
  import IVerification from "./IValidations";

  export class VerificationEmail implements IVerification{

    constructor(){

    }

    async verification(dados: CreateUserDTO | LoginUserDTO): Promise<{ success: boolean; message?: string }> {
      if (!dados.email || dados.email.trim() === '') {
        return { success: false, message: "O campo do e-mail está vazio." };
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(dados.email)) {
        return { success: false, message: "O formato do e-mail é inválido." };
      }




      return { success: true };

        }



  }
