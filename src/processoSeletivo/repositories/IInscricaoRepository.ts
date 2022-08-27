import { Aluno, Serie, Turno } from '@prisma/client'
import { IInscricaoDTO } from 'processoSeletivo/dtos/IInscricaoDTO'

export interface IInscricaoRepository {
  createInscricao(data: IInscricaoDTO): Promise<void>
  findAlunoByCPF(cpf: string): Promise<Aluno | null>
  findSerieById(id: string): Promise<Serie | null>
  findTurnoById(id: string): Promise<Turno | null>
}
