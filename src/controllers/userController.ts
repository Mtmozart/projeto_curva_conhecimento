import { Request, Response } from 'express'
import UserEntity from '../entities/UserEntity'
import UserRepository from '../repositories/UserRepository'
import CreateUserDTO from '../DTO/userDTOs/CreateUserDTO';
import encrypt from '../security/encryption/encryption';
import createHashCode from '../security/authentication/authentication';
import AllVerifications from '../security/validations/AllVerificationsToCreateFields';
import LoginUserDTO from '../DTO/userDTOs/LoginUserDTO';
import UserService from '../service/UserService';

export default class UserController {
  private allVerification = new AllVerifications();
  private userService: UserService;

  constructor(private userRepository: UserRepository) {
    this.userService = new UserService(userRepository);
  }

async createUser(req: Request, res: Response) {
  try {
    const dados: CreateUserDTO = req.body;

    /*redução da lógica de modo a reaproveitá-la em todo o controller,
    sim poderia reduzir mais, mas, está bom para o aprendizado. */
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

   const responseService  =  await this.userService.create(newUser)
   const messageService = responseService.message;
    if(responseService.success === false){
      return res.status(400).json({messageService})
    }

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

    const dados:LoginUserDTO = req.body
    const verifications = await this.allVerification.verification(dados);
    const message = verifications.message;
    if(!verifications.success){
     return res.status(400).json({ message })
    }


  }
}
