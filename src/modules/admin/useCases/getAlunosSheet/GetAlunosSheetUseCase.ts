import { IAdminRepository } from '@modules/admin/repositories/IAdminRepository'

export class GetAlunosSheetUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(): Promise<string[][]> {
    const inscricoesFound = await this.adminRepository.findAllAlunos()

    const results: string[][] = inscricoesFound.map((inscricao) => {
      const {
        nome,
        nascimento,
        cpf,
        email,
        serie: { name: serie },
        turno: { name: turno },
        cidade,
        estado,
        responsavel: { nome: nomeResp, email: emailResp, telefone },
      } = inscricao

      return [
        nome,
        nascimento.toISOString(),
        cpf,
        email,
        serie,
        turno,
        cidade,
        estado,
        nomeResp,
        emailResp,
        telefone,
      ]
    })

    return results
  }
}
