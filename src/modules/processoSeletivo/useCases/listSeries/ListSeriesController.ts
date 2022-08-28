import { Request, Response } from 'express'
import { InscricaoRepositoryPrisma } from '@modules/processoSeletivo/repositories/prisma/InscricaoRepositoryPrisma'
import { ListSeriesUseCase } from './ListSeriesUseCase'

export class ListSeriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const inscricaoRepositoryPrisma = new InscricaoRepositoryPrisma()
    const listSeriesUseCase = new ListSeriesUseCase(inscricaoRepositoryPrisma)
    const series = await listSeriesUseCase.execute()

    return res.status(201).send(series)
  }
}
