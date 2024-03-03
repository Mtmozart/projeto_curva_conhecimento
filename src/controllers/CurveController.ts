import { Request, Response } from 'express'
import CurseService from '../service/CurveService.js'


export default class CurveController {

  private service: CurseService;

  constructor() {
    this.service = new CurseService();
  }
async create(req: Request, res: Response){
  try {
    const today = new Date();

   const date = await this.service.create({
      title: "algo aleatório",
      description: "uma descrição",
      firstStudy: today,
    })

    res.json({date})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}
}
