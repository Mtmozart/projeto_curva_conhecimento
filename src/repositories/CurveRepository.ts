import { Repository } from "typeorm";
import SpacedRepetitionEntity from "../entities/SpacedRepetitionEntity";
import { ICurveRepository } from "./interfaces/ICurveRepository";
import UserRepository from "./UserRepository";
import UserEntity from "../entities/UserEntity";

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

  async findCurveById(id: number): Promise<{ curve: SpacedRepetitionEntity | null }> {
    try{
      const findCurve: SpacedRepetitionEntity  = await this.repository.findOneBy({id: id})
      if(!findCurve){
        return {curve: null };
      }
      return {curve: findCurve}


    }catch(error){
      throw new Error(error);
    }
  }

  async findAllByUser(user: UserEntity): Promise<{ curves: SpacedRepetitionEntity[]; }> {
    try {
      const curves: SpacedRepetitionEntity[] = await this.repository.find({
        where: {
          user: user// Convertendo para número, se necessário
      }
     });

      if(!curves.length){
          return {curves: []};
        }

        return {curves: curves};

    } catch (error) {
       throw new Error(error);
    }
  }

  async delete(id: number): Promise<{ success: boolean; }> {
  try {
      const curve = await this.repository.findOneBy({id: id})
      curve.active = false;
      return { success: true }
  } catch (error) {
    throw new Error(error);
  }
  }


}
