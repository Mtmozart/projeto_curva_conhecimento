import { Request, Response } from 'express'

export default class CurveController {

async create(req: Request, res: Response){
  try {
    res.json({message: "Rota criada."})
  } catch (error) {

  }
}
}
