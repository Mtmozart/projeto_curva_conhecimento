import CreateUserDTO from "../../DTO/userDTOs/CreateUserDTO";
import IVerification from "./IValidations";

export class VerificationRegex implements IVerification{

  async verification(dados: CreateUserDTO): Promise<{ success: boolean; message?: string }> {

    const regex = /^[^';<>\\]*$/;

    if(regex.test(dados.name) || regex.test(dados.email)

    || regex.test(dados.password) || regex.test(dados.confirmPassword))
    {
      return { success: false, message: "Caracteres inválidos." };
    }
    return { success: true };
  }


}
