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

   return res.status(201).json({curve: dateCurve})
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

        res.status(200).json({curve: curve})
      } catch (error) {
        res.status(500).json({ error: 'Erro interno no servidor' });
      }

    }

    async allCurveByUser(req: Request, res: Response){

      try {
        const { userId } = req.params
        const { curves }= await this.curveService.allCurveByUser(Number(userId));

        res.status(200).json({curves: curves})
      } catch (error) {
        res.status(500).json({ error: 'Erro interno no servidor: ' + error });
      }

    }

    async delete(req: Request, res: Response){
      const { userId, curveId } = req.params
      const curve = await this.curveService.delete(Number(userId),
          Number(curveId)
        );

    }


}
