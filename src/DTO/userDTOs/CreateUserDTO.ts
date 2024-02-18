
export default class CreateUserDTO{

    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    id?: string;
    constructor(name: string, email: string, password: string, confirmPassword: string, id?: string){
      this.name = name;
      this.email = email;
      this.password = password;
      this.confirmPassword = confirmPassword;
      this.id = id;
    }

}
