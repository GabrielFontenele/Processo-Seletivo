import { Request, Response } from 'express'
import { InscricaoRepositoryPrisma } from 'processoSeletivo/repositories/prisma/InscricaoRepositoryPrisma'
import { InscreverAlunoUseCase } from './InscreverAlunoUseCase'

export class InscreverAlunoController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { aluno, responsavel } = req.body

    const inscricaoRepositoryPrisma = new InscricaoRepositoryPrisma()
    const inscreverAlunoUseCase = new InscreverAlunoUseCase(
      inscricaoRepositoryPrisma,
    )

    await inscreverAlunoUseCase.execute({ aluno, responsavel })

    return res.status(200).send()
  }
}
