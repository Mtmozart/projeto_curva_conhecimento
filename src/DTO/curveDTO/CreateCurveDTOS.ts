
export default class CreateCurveDTO{

  userId: number;
  title: string;
  description: string;
  firstStudy: Date;

  constructor(userId: number, title: string, description: string, firstStudy: Date){
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.firstStudy = firstStudy;
  }
}
