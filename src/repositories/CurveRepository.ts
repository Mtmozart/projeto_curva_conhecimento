import { Repository } from "typeorm";
import SpacedRepetitionEntity from "../entities/SpacedRepetitionEntity";
import { ICurveRepository } from "./interfaces/ICurveRepository";
import UserRepository from "./UserRepository";
import UserEntity from "../entities/UserEntity";

export default class CurveRepository implements ICurveRepository{



  private repository:Repository<SpacedRepetitionEntity>;
  private userRepository:Repository<UserRepository>;

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
      const curve: SpacedRepetitionEntity[] = await this.repository.find({
        where: {
            user: user
        }
     });

      if(!curve.length){
          return {curves: []};
        }

        return {curves: curve};

    } catch (error) {
      throw new Error(error);
    }
  }



}
