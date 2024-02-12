import CreateUserDTO from "../../DTO/userDTOs/CreateUserDTO";
import { Response } from "express";
import LoginUserDTO from "../../DTO/userDTOs/LoginUserDTO";

export default interface IVerification{

  verification (dados: CreateUserDTO | LoginUserDTO): Promise<{success: boolean; message?: string}>;
}
