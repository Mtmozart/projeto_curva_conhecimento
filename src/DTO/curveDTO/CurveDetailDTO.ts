import SpacedRepetitionEntity from "../../entities/SpacedRepetitionEntity";
import UserEntity from "../../entities/UserEntity";

export default class CurveDetailDTO{
  title: string;
  user: UserEntity;
  description: string;
  firstStudy: Date;
  firstRevisionCourtTerm: Date;
  mediumTerm: Date;
  upToOneMonth: Date;
  upToTwoMonths: Date;
  upToThreeMonths: Date;
  active: boolean;

  constructor(curve: SpacedRepetitionEntity ){
    this.title = curve.title;
    this.description = curve.description;
    this.firstStudy = curve.firstStudy;
    this.firstRevisionCourtTerm = curve.firstRevisionCourtTerm;
    this.mediumTerm = curve.mediumTerm;
    this.upToOneMonth = curve.upToOneMonth;
    this.upToTwoMonths = curve.upToTwoMonths;
    this.upToThreeMonths = curve.upToThreeMonths;
   }

}
