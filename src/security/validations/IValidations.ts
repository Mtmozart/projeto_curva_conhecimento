import CreateUserDTO from "../../DTO/userDTOs/CreateUserDTO";
import { Response } from "express";

export default interface IVerification{

  verification (dados: CreateUserDTO,): Promise<{success: boolean; message?: string}>;
}
