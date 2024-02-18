
export default class TokenJWTDTO{
    id: string;
    email: string;
    name?: string;
    password?: string;
    confirmPassword?: string;

    constructor(id: string ,email: string, name?: string, password?: string, confirmPassword?: string){
      this.id = id;
      this.email = email;
      this.name = name;
      this.password = password;
      this. confirmPassword = confirmPassword

    }

}
