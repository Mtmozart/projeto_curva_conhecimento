import { Request, Response } from 'express'
import UserEntity from '../entities/UserEntity'
import UserRepository from '../repositories/UserRepository'
import CreateUserDTO from '../DTO/userDTOs/CreateUserDTO';


export default class UserController {

constructor(private userRepository: UserRepository){}


async createUser(req: Request, res: Response){
  try {

    const { name, email, password, confirmPassword } = <CreateUserDTO>req.body;

    if(password != confirmPassword || password == null || confirmPassword == null){
      return res.status(400).json({
       error: "Senha ou confirmação de senha são inválidos ou em branco."
      })
    }


    const newUser: UserEntity = {
      name: name,
      email: email,
      password: password
    }

    await this.userRepository.createUser(newUser);
    return res.status(201).json({
      name: newUser.name,
      email: newUser.email
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erro ao criar o usuário' });
  }

}
}
