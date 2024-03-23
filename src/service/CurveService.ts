import CreateCurveDTO from "../DTO/curveDTO/CreateCurveDTOS";
import CurveDetailDTO from "../DTO/curveDTO/CurveDetailDTO";
import SpacedRepetitionEntity from "../entities/SpacedRepetitionEntity";
import CurveRepository from "../repositories/CurveRepository";
import UserRepository from "../repositories/UserRepository";

export default class CurseService {



  constructor(private userRepository: UserRepository, private curveRepository: CurveRepository){
    this.userRepository = userRepository,
    this.curveRepository = curveRepository
  }

    async create(fields: CreateCurveDTO) {

      const firstRevisionCourtTerm = await this.createDatesCurve(fields.firstStudy, 15, "minutes");
      const mediumTerm = await this.createDatesCurve(fields.firstStudy, 1, "day");
      const longTerm = await this.createDatesCurve(fields.firstStudy, 7, "day");
      const upToOneMonth = await this.createDatesCurve(fields.firstStudy, 1, "month");
      const upToTwoMonth = await this.createDatesCurve(fields.firstStudy, 2, "month");
      const upToThreeMonth = await this.createDatesCurve(fields.firstStudy, 3, "month");
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

      return savedCurve.newCurve;
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

   async details(userId: number, curveId: number): Promise<{
    success: boolean;
    message?: string;
    curve?: CurveDetailDTO;
}> {

      const { user } = await this.userRepository.findUserById(userId);
      if(!user){
        return {success: false}
      }
      const {curve} = await this.curveRepository.findCurveById(curveId);
      if(!curve){
        return {success: false}
      }

      const curveDetailDTO = new CurveDetailDTO(curve)

      return {success: true, curve: curveDetailDTO}

    }

      async allCurveByUser(userId: number):  Promise<{
        success: boolean;
        message?: string;
        curves?: CurveDetailDTO[];
    }>{
      const { user } = await this.userRepository.findUserById(userId);
      if(!user){
        return {success: false}
      }
      const { curves } = await this.curveRepository.findAllByUser(user);


      let curvesResponse: CurveDetailDTO[] = [];

      curvesResponse = curves.map(c => ({
        userId: c.user.id,
        title: c.title,
        description: c.description,
        firstStudy: c.firstStudy,
        firstRevisionCourtTerm: c.firstRevisionCourtTerm,
        mediumTerm: c.mediumTerm,
        longTerm: c.longTerm,
        upToOneMonth: c.upToOneMonth,
        upToTwoMonths: c.upToTwoMonths,
        upToThreeMonths: c.upToThreeMonths,
        active: c.active
    }));
      return { success: true, curves: curvesResponse}

    }

    async delete(userId: number, curveId: number): Promise<{
      success: boolean;
      message?: string;
     }> {

      const { user } = await this.userRepository.findUserById(userId);
      if(!user){
        return {success: false}
      }
      const curveDelete = await this.curveRepository.delete(id);
      if( curveDelete.success == true){
        return {success: true, message: "Curve deletada com sucesso."}
      }
      return {success: false};
    }

}
