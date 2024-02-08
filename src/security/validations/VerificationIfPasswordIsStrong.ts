import CreateUserDTO from "../../DTO/userDTOs/CreateUserDTO";
import IVerification from "./IValidations";

export class VerificationIfPasswordIsStrong implements IVerification{

  async verification(dados: CreateUserDTO): Promise<{ success: boolean; message?: string }> {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regex.test(dados.confirmPassword)) {
      return { success: false, message: "A senha deve ter uma letra maiúscula, números e caracteres." };
    }

    return { success: true };
  }
}
