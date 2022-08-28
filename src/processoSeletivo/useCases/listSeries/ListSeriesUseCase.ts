import { ISelectDTO } from 'processoSeletivo/dtos/ISelectDTO'
import { IInscricaoRepository } from 'processoSeletivo/repositories/IInscricaoRepository'

export class ListSeriesUseCase {
  constructor(private inscricaoRepository: IInscricaoRepository) {}

  async execute(): Promise<ISelectDTO[]> {
    const series = await this.inscricaoRepository.listSeries()

    return series
  }
}
