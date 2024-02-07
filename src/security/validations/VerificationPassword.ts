import CreateUserDTO from "../../DTO/userDTOs/CreateUserDTO";
import IVerification from "./IValidations";
import { Response } from "express";

export class VerificationPassword implements IVerification{

  verificar(dados: CreateUserDTO, res: Response): void {
    if(dados.password != dados.confirmPassword || dados.password == null || dados.confirmPassword == null){
      res.status(400).json({
       error: "Senha ou confirmação de senha são inválidos ou em branco."
      })
    }
    throw new Error("Senha e confirmação de senha são diferentes.");
  }

}
