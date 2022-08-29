import { AdminRepositoryPrisma } from '@modules/admin/repositories/prisma/AdminRepositoryPrisma'
import { Request, Response } from 'express'

import { ListMatriculadosUseCase } from './ListMatriculadosUseCase'

export class ListMatriculadosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const page = Number(request.query.page as string)
    const adminRepositoryPrisma = new AdminRepositoryPrisma()
    const listMatriculadosUseCase = new ListMatriculadosUseCase(
      adminRepositoryPrisma,
    )

    const token = await listMatriculadosUseCase.execute(page)

    return response.json(token)
  }
}
