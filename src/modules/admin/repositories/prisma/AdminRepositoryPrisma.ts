import { Aluno, Responsavel, Serie, Turno, User } from '@prisma/client'
import { prisma } from '@shared/prisma'
import { IAdminRepository } from '../IAdminRepository'

export class AdminRepositoryPrisma implements IAdminRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findInscricoesByMatriculaState(
    matriculado: boolean,
    skip: number,
    take: number,
  ): Promise<
    (Aluno & {
      responsavel: Responsavel
      serie: Serie
      turno: Turno
    })[]
  > {
    const inscricao = await prisma.aluno.findMany({
      where: {
        matriculado,
      },
      include: {
        responsavel: true,
        serie: true,
        turno: true,
      },
      skip,
      take,
    })

    return inscricao
  }

  async findInscricoesCountByMatriculaState(
    matriculado: boolean,
  ): Promise<number> {
    const count = await prisma.aluno.count({ where: { matriculado } })

    return count
  }

  async findAlunoById(alunoId: string): Promise<Aluno | null> {
    const aluno = await prisma.aluno.findUnique({ where: { id: alunoId } })

    return aluno
  }

  async updateMatriculaById(alunoId: string): Promise<void> {
    await prisma.aluno.update({
      where: { id: alunoId },
      data: { matriculado: true },
    })
  }
}
