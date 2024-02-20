import { Request, Response } from 'express'
import UserRepository from '../repositories/UserRepository'
import CreateUserDTO from '../DTO/userDTOs/CreateUserDTO';
import AllVerifications from '../security/validations/AllVerificationsToCreateFields';
import LoginUserDTO from '../DTO/userDTOs/LoginUserDTO';
import UserService from '../service/UserService';
import AllVerificationsToLoginFields from '../security/validations/LoginVerifications/AllVerificationsToLoginFields';
import AuthenticationJWT from '../security/authentication/AuthenticationJWT';
import CaptureToken from '../utils/CaptureToken';
import UpdateUserDTO from '../DTO/userDTOs/UpdateUserDTO';
import TokenJWTDTO from '../DTO/userDTOs/TokenJWTDTO';

export default class UserController {
  private allVerification = new AllVerifications();
  private userService: UserService;
  private allVerificationToLOgin = new AllVerificationsToLoginFields()
  private authentication = new AuthenticationJWT()
  private captureToken = new CaptureToken()
  private allVerificationToUpdate = new AllVerificationsToLoginFields()


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

   const createdUser  =  await this.userService.create(dados)

   const messageService = createdUser.message;
    if(createdUser.success === false){
      return res.status(400).json({messageService})
    }

    const newUser: TokenJWTDTO = {
      id: createdUser.user.id,
      name: createdUser.user.name,
      email: createdUser.user.email,
     }

    const token = this.authentication.createToken(newUser);

    return res.status(201).json({
      id: createdUser.user.id,
      name: createdUser.user.name,
      email: createdUser.user.email,
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


    const token = this.authentication.createToken(user.user);
    return res.status(200).json({
      id: user.user.id,
      name: user.user.name,
      email: user.user.email,
      token: token
    });

  }
  async details(req: Request, res: Response){

    const id: number = parseInt(req.params.id);

    if(!id){
      return res.status(400).json({ message: "Id inválido."})
    }

    const user = await this.userService.details(id);

    if(!user.success){
      return res.status(400).json({ message: user.message })
    }

    return res.status(200).json({
      name: user.user.name,
      email: user.user.email,
    });

  }

  async update(req: Request, res: Response){

    const id: number = Number(req.params.id);
    const newDatas: UpdateUserDTO = req.body;
    const verifications = await this.allVerificationToUpdate.verification(newDatas);
    const messageVerification = verifications.message;
    if(!verifications.success){
     return res.status(400).json({ messageVerification })
    }

    if(!id){
      return res.status(400).json({ message: "Id inválido."})
    }

    const token = await this.captureToken.captured(req);
    if (!token.success) {
      return res.status(401).json({ message: token.message });
    }

    const{ user, message, success} = await this.userService.update(id, token.token, newDatas);

    if(!success){
      return res.status(401).json({ message: message });
    }



    const newToken =  this.authentication.createToken(user);


    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: newToken,  })


  }

}
