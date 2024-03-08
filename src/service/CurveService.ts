import CreateCurveDTO from "../DTO/curveDTO/CreateCurveDTOS";
import SpacedRepetitionEntity from "../entities/SpacedRepetitionEntity";
import CurveRepository from "../repositories/CurveRepository";
import UserRepository from "../repositories/UserRepository";

export default class CurseService {

  constructor(private userRepository: UserRepository, private curveRepository: CurveRepository){
    this.userRepository = userRepository,
    this.curveRepository = curveRepository
  }

    async create(fields: CreateCurveDTO) {

      const firstRevisionCourtTerm =  this.createDatesCurve(fields.firstStudy, 15, "minutes");
      const mediumTerm =  this.createDatesCurve(fields.firstStudy, 1, "day");
      const longTerm = this.createDatesCurve(fields.firstStudy, 7, "day");
      const upToOneMonth = this.createDatesCurve(fields.firstStudy, 1, "month");
      const upToTwoMonth = this.createDatesCurve(fields.firstStudy, 2, "month");
      const upToThreeMonth = this.createDatesCurve(fields.firstStudy, 3, "month");
      const { user } = await this.userRepository.findUserById(fields.userId);
      const newCurve: SpacedRepetitionEntity = {
        user: user,
        title: fields.title,
        description: fields.description,
        firstStudy: fields.firstStudy,
        firstRevisionCourtTerm: firstRevisionCourtTerm,
        mediumTerm: mediumTerm,
        longTerm: longTerm,
        upToOneMonth: upToOneMonth,
        upToTwoMonths: upToTwoMonth,
        upToThreeMonths: upToThreeMonth,
        active: true
      }
      const savedCurve = await this.curveRepository.create(newCurve);
      return savedCurve;
  }

  private createDatesCurve(date: Date, lapse: number, type: string): Date {
    let revision: Date = new Date(date);

    if (type === "minutes") {
      revision.setMinutes(revision.getMinutes() + lapse);
    } else if (type === "day") {
      revision.setDate(revision.getDate() + lapse);
    } else if (type === "month") {
      revision.setMonth(revision.getMonth() + lapse);
    }


    return revision;

    }
}
