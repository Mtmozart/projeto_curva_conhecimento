  import CreateUserDTO from "../../DTO/userDTOs/CreateUserDTO";
  import IVerification from "./IValidations";

  export class VerificationPassword implements IVerification{

    async verification(dados: CreateUserDTO): Promise<{ success: boolean; message?: string }> {
      if (dados.password === '' || dados.password === null) {
        return { success: false, message: "O campo da senha está vazio." };

      }
      if (dados.confirmPassword === '' || dados.confirmPassword === null) {
        return { success: false, message: "O campo da confirmação da senha está vazio." };
      }

      if (dados.password !== dados.confirmPassword) {

        return { success: false, message: "As senhas e confirmação da senha são divergentes." };
      }
      return { success: true };
    }


  }
