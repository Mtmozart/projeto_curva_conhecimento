import CreateCurveDTO from "../DTO/curveDTO/CreateCurveDTOS";

export default class CurseService {
  constructor() {
    this.createDatesCurve = this.createDatesCurve.bind(this);
  }

  async create(fields: CreateCurveDTO) {
    const curve = await this.createDatesCurve(fields.firstStudy);
    return curve;
  }

  private createDatesCurve(date: Date): Date[] {
    const firstRevisionCourtTerm = new Date(date);
    firstRevisionCourtTerm.setMinutes(date.getMinutes() + 15);
    const mediumTerm = new Date(date);
    mediumTerm.setDate(date.getDate() + 1);
    const longTerm = new Date(date);
    longTerm.setDate(date.getDate() + 7);
    const upToOneMonth = new Date(date);
    upToOneMonth.setMonth(date.getMonth() + 1);
    const upToTwoMonth = new Date(date);
    upToTwoMonth.setMonth(date.getMonth() + 2);
    const upToThreeMonth = new Date(date);
    upToThreeMonth.setMonth(date.getMonth() + 3);

    return [
      firstRevisionCourtTerm,
      mediumTerm,
      longTerm,
      upToOneMonth,
      upToTwoMonth,
      upToThreeMonth,
    ];
  }
}
