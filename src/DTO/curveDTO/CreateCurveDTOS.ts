import UserEntity from "../../entities/UserEntity";

export default class CreateUserDTO{

  title: string;
  user: UserEntity;
  description: string;
  firstStudy: Date;
  firstRevisionCourtTerm: Date;
  mediumTerm: Date;
  upToOneMonth: Date;
  upToTwoMonths: Date;
  upToSixMonths: Date;
  active: true;

  constructor(title: string, description: string, firstStudy: Date, firstRevisionCourtTerm: Date,
   mediumTerm: Date, upToOneMonth: Date, upToTwoMonths: Date, upToSixMonths: Date

    ){
    this.title = title;
    this.description = description;
    this.firstStudy = firstStudy;
    this.firstRevisionCourtTerm = firstRevisionCourtTerm;
    this.mediumTerm = mediumTerm;
    this.upToOneMonth = upToOneMonth;
    this.upToTwoMonths = upToTwoMonths;
    this.upToSixMonths = upToSixMonths;

  }

}
