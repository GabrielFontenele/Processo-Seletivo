interface IAluno {
  nome: string
  nascimento: string
  cpf: string
  email: string
  serieId: string
  turnoId: string
  cidade: string
  estado: string
}

export interface IResponsavel {
  nome: string
  email: string
  telefone: string
}

export interface IInscricaoDTO {
  aluno: IAluno
  responsavel: IResponsavel
}
