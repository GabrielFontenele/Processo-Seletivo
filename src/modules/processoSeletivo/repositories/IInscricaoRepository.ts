import { Aluno, Serie, Turno } from '@prisma/client'
import { IInscricaoDTO } from '@modules/processoSeletivo/dtos/IInscricaoDTO'
import { ISelectDTO } from '@modules/processoSeletivo/dtos/ISelectDTO'

export interface IInscricaoRepository {
  createInscricao(data: IInscricaoDTO): Promise<void>
  findAlunoByCPF(cpf: string): Promise<Aluno | null>
  findSerieById(id: string): Promise<Serie | null>
  findTurnoById(id: string): Promise<Turno | null>
  listSeries(): Promise<ISelectDTO[]>
  listTurnos(): Promise<ISelectDTO[]>
}
