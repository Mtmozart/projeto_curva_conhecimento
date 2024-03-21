import SpacedRepetitionEntity from "../../entities/SpacedRepetitionEntity.js"
import UserEntity from "../../entities/UserEntity.js"

export interface ICurveRepository {

  create(curve: SpacedRepetitionEntity): null | Promise<{newCurve: SpacedRepetitionEntity}>
  findCurveById(id: number): Promise<{curve: SpacedRepetitionEntity | null}>
  findAllByUser(user: UserEntity): Promise<{curves: SpacedRepetitionEntity[] | null}>
}
