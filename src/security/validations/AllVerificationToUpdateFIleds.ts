import CreateUserDTO from "../../DTO/userDTOs/CreateUserDTO";
import LoginUserDTO from "../../DTO/userDTOs/LoginUserDTO";
import { AppDataSource } from "../../config/dataSource";
import UserRepository from "../../repositories/UserRepository";
import IVerification from "./IValidations";
import { VerificationEmail } from "./VerificationEmail";
import { VerificationIfFieldsIsBlack } from "./VerificationIfFieldsIsBlack";
import { VerificationIfPasswordIsStrong } from "./VerificationIfPasswordIsStrong";
import { VerificationRegex } from "./VerificationRegex";

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
      new VerificationEmail(),
      new VerificationIfPasswordIsStrong(),
      new VerificationRegex(),
      new VerificationIfFieldsIsBlack()
    ];
  }

  async verification(dados: CreateUserDTO | LoginUserDTO): Promise<{ success: boolean; message?: string; }> {

    const results = await Promise.all(this.getAllVerifications().map(verification => verification.verification(dados)));
    const hasFailedVerification = results.some(result => !result.success);
    if (hasFailedVerification) {
      const failedVerification = results.find(result => !result.success);
      return { success: false, message: failedVerification.message };
    }
    return { success: true };
    }



  }


