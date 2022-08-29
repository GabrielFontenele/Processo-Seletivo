import { Aluno, Responsavel, Serie, Turno, User } from '@prisma/client'

export interface IAdminRepository {
  findUserByEmail(email: string): Promise<User | null>
  findUserById(id: string): Promise<User | null>
  findInscricoesByMatriculaState(
    matriculado: boolean,
    skip: number,
    take: number,
  ): Promise<
    (Aluno & {
      responsavel: Responsavel
      serie: Serie
      turno: Turno
    })[]
  >
  findInscricoesCountByMatriculaState(matriculado: boolean): Promise<number>
}
