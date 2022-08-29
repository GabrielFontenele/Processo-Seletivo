import { AdminRepositoryPrisma } from '@modules/admin/repositories/prisma/AdminRepositoryPrisma'
import { Request, Response } from 'express'

import { ListInscritosUseCase } from './ListInscritosUseCase'

export class ListInscritosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const page = Number(request.query.page as string)
    const adminRepositoryPrisma = new AdminRepositoryPrisma()
    const listInscritosUseCase = new ListInscritosUseCase(adminRepositoryPrisma)

    const token = await listInscritosUseCase.execute(page)

    return response.json(token)
  }
}
