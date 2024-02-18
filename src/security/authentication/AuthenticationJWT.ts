import TokenJWTDTO from "../../DTO/userDTOs/TokenJWTDTO";
import dotenv from 'dotenv';
require('dotenv').config();

dotenv.config();

export default class AuthenticationJWT {
  private jwt: any = require('jsonwebtoken')
  private secret =  process.env.SECRET


  createToken(user: TokenJWTDTO): string {


    const token = this.jwt.sign({
    id: user.id,
    name: user.name,
    email: user.email
  }, this.secret,  { expiresIn: '1h' });

  return token;
  }

   verify(token: string): TokenJWTDTO{

    try {
      const decoded: TokenJWTDTO = this.jwt.verify(token, this.secret)

      return decoded
    } catch (error) {

      throw new Error("Erro na verificação do token.")
    }

  }

}



