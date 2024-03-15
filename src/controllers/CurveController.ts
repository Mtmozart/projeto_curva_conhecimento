import { Request, Response } from 'express'
import CurveService from '../service/CurveService.js'
import CurveRepository from '../repositories/CurveRepository.js';
import UserRepository from '../repositories/UserRepository.js';


export default class CurveController {

  private curveService: CurveService;

  constructor(private curveRepository: CurveRepository, private userRepository: UserRepository,) {
    this.curveService = new CurveService(userRepository, curveRepository);
  }


async create(req: Request, res: Response){
  try {

    const { id } = req.params
    const { title, description, firstStudy} = req.body;
    const firstStudyDate = new Date(firstStudy)
    const dateCurve = await this.curveService.create({
        userId: Number(id),
        title: title,
        description: description,
        firstStudy: firstStudyDate,
      })

   return res.json({curve: dateCurve})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}


    async details(req: Request, res: Response){

      try {
        const { userId, curveId } = req.params
        const curve = await this.curveService.details(Number(userId),
          Number(curveId)
        );
      } catch (error) {
        res.status(500).json({ error: 'Erro interno no servidor' });
      }

    }
}
