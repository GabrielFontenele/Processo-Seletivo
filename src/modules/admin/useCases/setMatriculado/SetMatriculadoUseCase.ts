import { AppError } from '@shared/errors/AppError'
import { IAdminRepository } from '@modules/admin/repositories/IAdminRepository'

export class SetMatriculadoUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(alunoId: string): Promise<void> {
    const aluno = await this.adminRepository.findAlunoById(alunoId)

    if (!aluno) {
      throw new AppError('Aluno não encontrado')
    }

    await this.adminRepository.updateMatriculaById(alunoId)
  }
}
