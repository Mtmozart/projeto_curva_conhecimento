import CreateUserDTO from "../../DTO/userDTOs/CreateUserDTO";
import IVerification from "./IValidations";

export class VerificationRegex implements IVerification{

  async verification(dados: CreateUserDTO): Promise<{ success: boolean; message?: string }> {

     /*  if(regex.test(dados.name) || regex.test(dados.email)

    || regex.test(dados.password) || regex.test(dados.confirmPassword))
    {
      return { success: false, message: "Caracteres inválidos." };
    }*/
    const regex = /^[^';<>\\]*$/;

    for (const key in dados) {
      if (Object.prototype.hasOwnProperty.call(dados, key)) {
        const value = dados[key as keyof CreateUserDTO];
        if(regex.test(value)){
          return { success: false, message: "Caracteres inválidos." };
        }
      }
    }
    return { success: true };
  }


}
