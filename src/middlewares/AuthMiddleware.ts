import { Request, Response, NextFunction } from "express";
import AuthenticationJWT from '../security/authentication/AuthenticationJWT.js';
import TokenJWTDTO from "../DTO/userDTOs/TokenJWTDTO.js";


export default class AuthMiddleware {

  private authenticationJWT = new AuthenticationJWT()

  public async  authMiddleware(req: Request, res: Response, next: NextFunction) {

    const headersToken = req.headers['authorization']

    if (!headersToken) {
      return res.status(401).json({ message: "Acesso negado." });
    }

    try {
      const tokenSplit = headersToken.split(' ');
      const token = tokenSplit[1]
      const user: TokenJWTDTO = await this.authenticationJWT.verify(token);
      if (!user) {
        return res.status(401).json({ message: "Acesso negado." });
      }

    next()
  }catch (error) {
    console.log(error)
   res.status(401).json({ message: "Acesso negado."});
  }

}
}
