import { Request, Response } from 'express'
import UserEntity from '../entities/UserEntity'
import UserRepository from '../repositories/UserRepository'
import CreateUserDTO from '../DTO/userDTOs/CreateUserDTO';
import { VerificationPassword } from '../security/validations/VerificationPassword';
import IVerification from '../security/validations/IValidations';


export default class UserController {

constructor(private userRepository: UserRepository, private verifications: IVerification[]){
this.verifications = verifications;
}


async createUser(req: Request, res: Response) {
  try {
    const dados: CreateUserDTO = req.body;

    const results= await Promise.all(this.verifications.map(verification => verification.verification(dados)));

    const failedVerification = results.flat().find(result => !result.success);
    const message = failedVerification.message;

    if(!failedVerification.success){
      return res.status(401).json({ message });
    }

    else{
    const newUser: UserEntity = {
      name: dados.name,
      email: dados.email,
      password: dados.password
    };


    await this.userRepository.createUser(newUser);

    return res.status(201).json({
      name: newUser.name,
      email: newUser.email
    });
  }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao criar o usuário' });
  }
}
}
