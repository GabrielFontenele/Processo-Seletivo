import { Aluno, Prisma, Serie, Turno } from '@prisma/client'
import { IInscricaoDTO } from 'processoSeletivo/dtos/IInscricaoDTO'
import { IInscricaoRepository } from '../IInscricaoRepository'
import { prisma } from '@shared/prisma'
import { ISelectDTO } from 'processoSeletivo/dtos/ISelectDTO'

export class InscricaoRepositoryPrisma implements IInscricaoRepository {
  async createInscricao(data: IInscricaoDTO): Promise<void> {
    const { aluno: alunoData, responsavel: responsavelData } = data
    await prisma.$transaction(async (prisma: Prisma.TransactionClient) => {
      const responsavel = await prisma.responsavel.create({
        data: {
          email: responsavelData.email,
          nome: responsavelData.nome,
          telefone: responsavelData.telefone,
        },
      })
      const aluno = await prisma.aluno.create({
        data: { responsavelId: responsavel.id, ...alunoData },
      })

      return aluno
    })
  }

  async findAlunoByCPF(cpf: string): Promise<Aluno | null> {
    const aluno = await prisma.aluno.findUnique({ where: { cpf } })
    return aluno
  }

  async findSerieById(id: string): Promise<Serie | null> {
    const serie = await prisma.serie.findUnique({ where: { id } })
    return serie
  }

  async findTurnoById(id: string): Promise<Turno | null> {
    const turno = await prisma.turno.findUnique({ where: { id } })
    return turno
  }

  async listSeries(): Promise<ISelectDTO[]> {
    const series = await prisma.serie.findMany({
      select: { id: true, name: true },
    })
    return series
  }

  async listTurnos(): Promise<ISelectDTO[]> {
    const turnos = await prisma.turno.findMany({
      select: { id: true, name: true },
    })
    return turnos
  }
}
