import { Request, Response } from 'express'
import UserEntity from '../entities/UserEntity'
import UserRepository from '../repositories/UserRepository'
import CreateUserDTO from '../DTO/userDTOs/CreateUserDTO';
import { VerificationPassword } from '../security/validations/VerificationPassword';


export default class UserController {

constructor(private userRepository: UserRepository, private verifications: VerificationPassword){

}


async createUser(req: Request, res: Response) {
  try {
    const dados: CreateUserDTO = req.body;

    let { success, message} = await this.verifications.verification(dados);

    if(!success){
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
