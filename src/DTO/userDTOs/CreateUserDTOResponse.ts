
export default class CreateUserDTOResponse{

    name: string;
    email: string;
    id: string;
    constructor(name: string, email: string,  id: string){
      this.name = name;
      this.email = email;
      this.id = id;
    }

}
