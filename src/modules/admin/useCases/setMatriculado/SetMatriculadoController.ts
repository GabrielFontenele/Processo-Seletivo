import { AdminRepositoryPrisma } from '@modules/admin/repositories/prisma/AdminRepositoryPrisma'
import { Request, Response } from 'express'
import { SetMatriculadoUseCase } from './SetMatriculadoUseCase'

export class SetMatriculadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { alunoId } = request.body

    const adminRepositoryPrisma = new AdminRepositoryPrisma()
    const setMatriculadoUseCase = new SetMatriculadoUseCase(
      adminRepositoryPrisma,
    )

    await setMatriculadoUseCase.execute(alunoId)

    return response.status(201).send()
  }
}
