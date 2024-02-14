import { Request, Response, NextFunction } from "express";
import AuthenticationJWT from '../security/authentication/AuthenticationJWT';
import TokenJWTDTO from "../DTO/userDTOs/TokenJWTDTO";

export default class AuthMiddleware {

  private authentication = new AuthenticationJWT()

  public authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const headersToken = req.headers['authorization']

    if (!headersToken) {
      return res.status(401).json({ message: "Acesso negado." });
    }

    const tokenSplit = headersToken.split(' ');
    const token = tokenSplit[1]

    try {
      const user: TokenJWTDTO = await this.authentication.verify(token);
      if (!user) {
        return res.status(401).json({ message: "Acesso negado." });
      }

      next();
    } catch (error) {

      return res.status(500).json({ message: "Erro na verificação do token." });
    }
  }
}
