import CreateUserDTO from "../../DTO/userDTOs/CreateUserDTO";
import IVerification from "./IValidations";

export class VerificationIfFieldsIsBlack implements IVerification{

  async verification(dados: CreateUserDTO): Promise<{ success: boolean; message?: string; }> {
    for (const key in dados) {
      if (Object.prototype.hasOwnProperty.call(dados, key)) {
        const value = dados[key as keyof CreateUserDTO];
        if(value == '' || value == null || value == undefined){
          return { success: false, message: "Verifique se algum campo está vazio." };
        }
      }
    }
    return { success: true }
  }

}
