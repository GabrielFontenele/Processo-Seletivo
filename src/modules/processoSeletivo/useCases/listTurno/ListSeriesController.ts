import { Request, Response } from 'express'
import { InscricaoRepositoryPrisma } from '@modules/processoSeletivo/repositories/prisma/InscricaoRepositoryPrisma'
import { ListTurnosUseCase } from './ListTurnosUseCase'

export class ListTurnosController {
  async handle(req: Request, res: Response): Promise<Response> {
    const inscricaoRepositoryPrisma = new InscricaoRepositoryPrisma()
    const listTurnosUseCase = new ListTurnosUseCase(inscricaoRepositoryPrisma)
    const turnos = await listTurnosUseCase.execute()

    return res.status(201).send(turnos)
  }
}
