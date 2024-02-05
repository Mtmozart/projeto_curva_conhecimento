import { Request, Response } from 'express'
import UserEntity from '../entities/UserEntity'
import UserRepository from '../repositories/UserRepository'


export default class UserController {

constructor(private userRepository: UserRepository){}


async createUser(req: Request, res: Response){
  try {

    const { name, email, password } = <UserEntity>req.body;

    const newUser = {
      name,
      email,
      password
    }

    await this.userRepository.createUser(newUser);
    return res.status(201).json(newUser);

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erro ao criar o usuário' });
  }

}
}
