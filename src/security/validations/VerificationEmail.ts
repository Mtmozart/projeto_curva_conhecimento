  import CreateUserDTO from "../../DTO/userDTOs/CreateUserDTO";
  import IVerification from "./IValidations";

  export class VerificationEmail implements IVerification{

    async verification(dados: CreateUserDTO): Promise<{ success: boolean; message?: string }> {
      if (dados.email === '' || dados.email === null) {
        return { success: false, message: "O campo da senha está vazio." };
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(dados.email)) {
        return { success: false, message: "O e-mail enviado é inválido." };
      }
      return { success: true };
    }


  }
