import { Request, Response } from 'express'
import UserRepository from '../repositories/UserRepository'
import CreateUserDTO from '../DTO/userDTOs/CreateUserDTO';
import AllVerifications from '../security/validations/AllVerificationsToCreateFields';
import LoginUserDTO from '../DTO/userDTOs/LoginUserDTO';
import UserService from '../service/UserService';
import AllVerificationsToLoginFields from '../security/validations/LoginVerifications/AllVerificationsToLoginFields';
import AuthenticationJWT from '../security/authentication/AuthenticationJWT';

export default class UserController {
  private allVerification = new AllVerifications();
  private userService: UserService;
  private allVerificationToLOgin = new AllVerificationsToLoginFields()
  private authentication = new AuthenticationJWT()


  constructor(private userRepository: UserRepository) {
    this.userService = new UserService(userRepository);
  }

async createUser(req: Request, res: Response) {
  try {
    const dados: CreateUserDTO = req.body;

    /*redução da lógica de modo a reaproveitá-la em todo o controller,
    sim, poderia reduzir mais, mas, está bom para o aprendizado. */
   const verifications = await this.allVerification.verification(dados);
   const message = verifications.message;
   if(!verifications.success){
    return res.status(400).json({ message })
   }

   const createUser  =  await this.userService.create(dados)
   const messageService = createUser.message;
    if(createUser.success === false){
      return res.status(400).json({messageService})
    }

    const token = this.authentication.createToken(dados);
    return res.status(201).json({
      name: dados.name,
      email: dados.email,
      token: token
    });

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar o usuário'+ error });
  }
}

  async login(req: Request, res: Response){

    const dados:LoginUserDTO = req.body
    const verifications = await this.allVerificationToLOgin.verification(dados);
    const message = verifications.message;
    if(!verifications.success){
     return res.status(400).json({ message })
    }


    const user = await this.userService.login(dados);
    const messageUser = user.message;
    if(user.success === false){
      return res.status(400).json({messageUser})
    }

    const userToken = {
      name: user.user.name,
      email: user.user.email
    }
    const token = this.authentication.createToken(userToken);
    return res.status(200).json({
      name: userToken.name,
      email: userToken.email,
      token: token
    });

  }

  async details(req: Request, res: Response){

   return res.status(200).json({ message: "sucesso"})
  }
}
