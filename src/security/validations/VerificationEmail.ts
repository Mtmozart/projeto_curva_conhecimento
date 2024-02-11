  import CreateUserDTO from "../../DTO/userDTOs/CreateUserDTO";
import UserRepository from "../../repositories/UserRepository";
  import IVerification from "./IValidations";

  export class VerificationEmail implements IVerification{

    constructor(private repository: UserRepository){

    }

    async verification(dados: CreateUserDTO): Promise<{ success: boolean; message?: string }> {
      if (!dados.email || dados.email.trim() === '') {
        return { success: false, message: "O campo do e-mail está vazio." };
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(dados.email)) {
        return { success: false, message: "O formato do e-mail é inválido." };
      }



      const userAlreadyExist = await this.repository.findUserByEmail(dados.email);

      if (userAlreadyExist.success === true) {
        return { success: false, message: "O E-mail já cadastrado." };
      }


      return { success: true };

        }



  }
