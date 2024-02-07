import CreateUserDTO from "../../DTO/userDTOs/CreateUserDTO";
import { Response } from "express";

export default interface IVerification{

  verificar (dados: CreateUserDTO, res: Response): void;
}
