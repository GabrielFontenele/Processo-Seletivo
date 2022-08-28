import { ISelectDTO } from '@modules/processoSeletivo/dtos/ISelectDTO'
import { IInscricaoRepository } from '@modules/processoSeletivo/repositories/IInscricaoRepository'

export class ListSeriesUseCase {
  constructor(private inscricaoRepository: IInscricaoRepository) {}

  async execute(): Promise<ISelectDTO[]> {
    const series = await this.inscricaoRepository.listSeries()

    return series
  }
}
