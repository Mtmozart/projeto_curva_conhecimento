import { Request, Response } from "express";

export default class CaptureToken {

  public async captured(req: Request):Promise<{ success: boolean; message?: string, token?: string }>{

    const headersToken = req.headers['authorization'];

    if (!headersToken) {
      return { success: false, message: "Acesso negado." };
    }

    const tokenSplit = headersToken.split(' ');
    const token = tokenSplit[1];

    return { success: true, token: token };
  }

}
