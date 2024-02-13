import TokenJWTDTO from "../../DTO/userDTOs/TokenJWTDTO";
import dotenv from 'dotenv';
require('dotenv').config();

dotenv.config();



const jwt: any = require('jsonwebtoken');
const secret =  process.env.SECRET
export default function createToken(user: TokenJWTDTO): string {
  const token = jwt.sign({
    name: user.name,
    email: user.email
  }, secret,  { expiresIn: '1h' });

  return token;
}

