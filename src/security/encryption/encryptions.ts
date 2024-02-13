const bcrypt = require('bcryptjs');

export default class Encryptions {
  constructor() {}

  public encrypt(password: string): string {
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  public async decode(password: string, hashedPassword: string): Promise<{success: boolean; message?: string}> {
    try {
    const passwordMatched = await bcrypt.compare(password, hashedPassword);

    if(!passwordMatched){
    return { success: false}
    }
    return { success: true}

    } catch (error) {
    console.error("Erro ao comparar senhas:", error);
    return { success: false, message: "Erro interno." };
    }

    }
}
