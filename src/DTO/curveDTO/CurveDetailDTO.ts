import SpacedRepetitionEntity from "../../entities/SpacedRepetitionEntity";
import UserEntity from "../../entities/UserEntity";

export default class CurveDetailDTO{
  title: string;
  description: string;
  firstStudy: Date;
  firstRevisionCourtTerm: Date;
  longTerm: Date;
  mediumTerm: Date;
  upToOneMonth: Date;
  upToTwoMonths: Date;
  upToThreeMonths: Date;
  active: boolean;
  userId?: Number;

  constructor(curve: SpacedRepetitionEntity ){
    this.userId = curve.user.id;
    this.title = curve.title;
    this.description = curve.description;
    this.firstStudy = curve.firstStudy;
    this.firstRevisionCourtTerm = curve.firstRevisionCourtTerm;
    this.mediumTerm = curve.mediumTerm;
    this.longTerm = curve.longTerm;
    this.upToOneMonth = curve.upToOneMonth;
    this.upToTwoMonths = curve.upToTwoMonths;
    this.upToThreeMonths = curve.upToThreeMonths;
    this.userId = curve.user.id;
   }

}
