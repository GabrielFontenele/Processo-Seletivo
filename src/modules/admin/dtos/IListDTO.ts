import { IInscricaoDTO } from './IInscricaoDTO'

export interface IListDTO {
  results: IInscricaoDTO[]
  totalDocs: number
  page: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}
