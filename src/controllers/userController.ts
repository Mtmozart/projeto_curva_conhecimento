import { Request, Response } from 'express'
import UserEntity from '../entities/UserEntity'
import UserRepository from '../repositories/UserRepository'
import CreateUserDTO from '../DTO/userDTOs/CreateUserDTO';
import IVerification from '../security/validations/IValidations';
import encrypt from '../security/validations/encryption/encryption';



export default class UserController {

constructor(private userRepository: UserRepository, private verifications: IVerification[]){
this.verifications = verifications;
}


async createUser(req: Request, res: Response) {
  try {
    const dados: CreateUserDTO = req.body;

    const results = await Promise.all(this.verifications.map(verification => verification.verification(dados)));

    const hasFailedVerification = results.some(result => !result.success);

    if (hasFailedVerification) {
      const failedVerification = results.find(result => !result.success);
      const message = failedVerification?.message || "Erro durante a verificação.";

      return res.status(401).json({ message });
    }

    //encriptação
    const hashedPassword = encrypt(dados.password);

    const newUser: UserEntity = {
      name: dados.name,
      email: dados.email,
      password: hashedPassword
    };



    await this.userRepository.createUser(newUser);

    return res.status(201).json({
      name: newUser.name,
      email: newUser.email,
    });

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar o usuário'+ error });
  }
}
}
