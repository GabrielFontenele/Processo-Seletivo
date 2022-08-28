import { AppError } from '@shared/errors/AppError'
import { IInscricaoDTO } from '@modules/processoSeletivo/dtos/IInscricaoDTO'
import { IInscricaoRepository } from '@modules/processoSeletivo/repositories/IInscricaoRepository'

export class InscreverAlunoUseCase {
  constructor(private inscricaoRepository: IInscricaoRepository) {}

  async execute(data: IInscricaoDTO): Promise<void> {
    const {
      aluno: { cpf, serieId, turnoId },
    } = data

    const alunoAlreadyExists = await this.inscricaoRepository.findAlunoByCPF(
      cpf,
    )

    if (alunoAlreadyExists) {
      throw new AppError('Aluno already exists')
    }

    const serieExists = await this.inscricaoRepository.findSerieById(serieId)

    if (!serieExists) {
      throw new AppError(`serie doesn't exists`)
    }

    const turnoExists = await this.inscricaoRepository.findTurnoById(turnoId)

    if (!turnoExists) {
      throw new AppError(`turno doesn't exists`)
    }

    await this.inscricaoRepository.createInscricao(data)
  }
}
