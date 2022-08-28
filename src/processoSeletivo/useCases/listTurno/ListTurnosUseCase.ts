import { ISelectDTO } from 'processoSeletivo/dtos/ISelectDTO'
import { IInscricaoRepository } from 'processoSeletivo/repositories/IInscricaoRepository'

export class ListTurnosUseCase {
  constructor(private inscricaoRepository: IInscricaoRepository) {}

  async execute(): Promise<ISelectDTO[]> {
    const turnos = await this.inscricaoRepository.listTurnos()

    return turnos
  }
}
