interface IAluno {
  id: string
  nome: string
  nascimento: Date
  cpf: string
  email: string
  serie: string
  turno: string
  cidade: string
  estado: string
}

interface IResponsavel {
  nome: string
  email: string
  telefone: string
}

export interface IInscricaoDTO {
  aluno: IAluno
  responsavel: IResponsavel
}
