import SpacedRepetitionEntity from "../../entities/SpacedRepetitionEntity.js"

export interface ICurveRepository {

  create(curve: SpacedRepetitionEntity): null | Promise<{newCurve: SpacedRepetitionEntity}>
  findCurveById(id: number): Promise<{curve: SpacedRepetitionEntity | null}>
}
