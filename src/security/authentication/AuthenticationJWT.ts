import TokenJWTDTO from "../../DTO/userDTOs/TokenJWTDTO";
import dotenv from 'dotenv';
require('dotenv').config();

dotenv.config();

export default class AuthenticationJWT {
  private jwt: any = require('jsonwebtoken')
  private secret =  process.env.SECRET


  createToken(user: TokenJWTDTO): string {
  const token = this.jwt.sign({
    name: user.name,
    email: user.email
  }, this.secret,  { expiresIn: '1h' });

  return token;
  }

  public async verify(token: string): Promise<TokenJWTDTO>{
    console.log(token)
    try {
      const decoded: TokenJWTDTO = await this.jwt.verify(token, this.secret)
      console.log(decoded)
      return decoded
    } catch (error) {
      console.log(token)
      throw new Error("Erro na verificação do token.")
    }

  }

}



