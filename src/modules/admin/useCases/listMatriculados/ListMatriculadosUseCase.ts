import { IInscricaoDTO } from '@modules/admin/dtos/IInscricaoDTO'
import { IListDTO } from '@modules/admin/dtos/IListDTO'
import { IAdminRepository } from '@modules/admin/repositories/IAdminRepository'

export class ListMatriculadosUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(page: number): Promise<IListDTO> {
    const take = 50
    const skip = page === 1 ? 0 : take * (page - 1)

    const totalDocs =
      await this.adminRepository.findInscricoesCountByMatriculaState(true)

    const inscricoesFound =
      await this.adminRepository.findInscricoesByMatriculaState(
        true,
        skip,
        take,
      )

    const results: IInscricaoDTO[] = inscricoesFound.map((inscricao) => {
      const {
        id,
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
      return {
        aluno: {
          id,
          nome,
          nascimento,
          cpf,
          email,
          serie,
          turno,
          cidade,
          estado,
        },
        responsavel: {
          nome: nomeResp,
          email: emailResp,
          telefone,
        },
      }
    })

    const numberOfPages = Math.ceil(totalDocs / take)

    const list: IListDTO = {
      results,
      totalDocs,
      page,
      totalPages: numberOfPages,
      hasNext: totalDocs > skip + results.length,
      hasPrev: page > 1,
    }

    return list
  }
}
