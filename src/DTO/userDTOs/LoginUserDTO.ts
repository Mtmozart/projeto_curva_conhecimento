
export default class LoginUserDTO{

  email: string;
  password: string;
  name?: string;
  id?: string;
  constructor(email: string, password: string, name?: string, id?: string){
    this.email = email;
    this.password = password;
    this.name = name;
    this.id = id;

  }

}
