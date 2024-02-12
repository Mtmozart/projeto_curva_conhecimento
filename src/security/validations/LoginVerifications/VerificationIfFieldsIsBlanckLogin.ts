import CreateUserDTO from "../../../DTO/userDTOs/CreateUserDTO";
import LoginUserDTO from "../../../DTO/userDTOs/LoginUserDTO";
import IVerification from "../IValidations";

export class VerificationIfFieldsIsBlancLogin implements IVerification{

  async verification(dados: LoginUserDTO ): Promise<{ success: boolean; message?: string; }> {
    for (const key in dados) {
      if (Object.prototype.hasOwnProperty.call(dados, key)) {
        const value = dados[key as keyof LoginUserDTO];
        if(value == '' || value == null || value == undefined){
          return { success: false, message: "Verifique se algum campo está vazio." };
        }
      }
    }
    return { success: true }
  }

}
