import { Repository } from "typeorm";
import SpacedRepetitionEntity from "../entities/SpacedRepetitionEntity";
import { ICurveRepository } from "./interfaces/ICurveRepository";

export default class CurveRepository implements ICurveRepository{


  private repository:Repository<SpacedRepetitionEntity>;

  constructor(repository: Repository<SpacedRepetitionEntity>){
    this.repository = repository;
   }

  async create(curve: SpacedRepetitionEntity): Promise<{ newCurve: SpacedRepetitionEntity; }> {
   try {
    const newCurve = await this.repository.save(curve);
    return {newCurve};
   } catch (error) {
    throw new Error(error);
   }
  }

  details(curveId: number) {
    throw new Error("Method not implemented.");
  }

}
