import { Request, Response } from 'express'
import UserEntity from '../entities/UserEntity'
import UserRepository from '../repositories/UserRepository'
import CreateUserDTO from '../DTO/userDTOs/CreateUserDTO';
import IVerification from '../security/validations/IValidations';
import encrypt from '../security/encryption/encryption';
import createHashCode from '../security/authentication/authentication';
import AllVerifications from '../security/validations/AllVerifications';

export default class UserController {
  private allVerification = new AllVerifications()
constructor(private userRepository: UserRepository){

}

async createUser(req: Request, res: Response) {
  try {
    const dados: CreateUserDTO = req.body;


   const verifications = await this.allVerification.verification(dados);

   const message = verifications.message;
   if(!verifications.success){
    return res.status(400).json({ message })
   }

    //encriptação
    const hashedPassword = encrypt(dados.password);

    const newUser: UserEntity = {
      name: dados.name,
      email: dados.email,
      password: hashedPassword
    };
    await this.userRepository.createUser(newUser);
    const token = createHashCode(dados);
    return res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      token: token
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar o usuário'+ error });
  }
}

  async login(req: Request, res: Response){

  }
}
