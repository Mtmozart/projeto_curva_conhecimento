import UserEntity from "../../entities/UserEntity";

export default class CreateCurveDTO{

  title: string;
 // user: UserEntity;
  description: string;
  firstStudy: Date;

  constructor(title: string, description: string, firstStudy: Date){
    this.title = title;
    this.description = description;
    this.firstStudy = firstStudy;


  }

}
