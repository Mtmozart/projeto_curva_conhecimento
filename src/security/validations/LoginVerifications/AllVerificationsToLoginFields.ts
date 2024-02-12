import LoginUserDTO from "../../../DTO/userDTOs/LoginUserDTO";
import { AppDataSource } from "../../../config/dataSource";
import UserRepository from "../../../repositories/UserRepository";
import IVerification from "../IValidations";
import { VerificationEmail } from "../VerificationEmail";
import { VerificationIfFieldsIsBlack } from "../VerificationIfFieldsIsBlack";
import { VerificationRegex } from "../VerificationRegex";

export default class AllVerificationsToLoginFields implements IVerification{

  private userRepository: UserRepository;
  constructor() {
    try {
      this.userRepository = new UserRepository(AppDataSource.getRepository("UserEntity"));
    } catch (error) {
      console.error("Erro ao criar UserRepository:", error);

    }
  }

  private getAllVerifications(): IVerification[] {
    return [
      new VerificationRegex(),
      new VerificationIfFieldsIsBlack(),
      new VerificationEmail(),

    ];
  }

  async verification(dados: LoginUserDTO): Promise<{ success: boolean; message?: string; }> {

    const results = await Promise.all(this.getAllVerifications().map(verification => verification.verification(dados)));
    const hasFailedVerification = results.some(result => !result.success);
    if (hasFailedVerification) {
      const failedVerification = results.find(result => !result.success);
      return { success: false, message: failedVerification.message };
    }
    return { success: true };
    }



  }



