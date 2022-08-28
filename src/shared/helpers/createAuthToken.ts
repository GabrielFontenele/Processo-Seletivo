import { sign } from 'jsonwebtoken'

import { AppError } from '@shared/errors/AppError'
import { ITokenResponseDTO } from '@modules/admin/dtos/ITokenResponseDTO'

export function createAuthToken(id: string, name: string): ITokenResponseDTO {
  const secret = process.env.SECRET ?? ''

  if (!secret) {
    throw new AppError('Internal Error')
  }

  const token = sign({}, secret, {
    subject: id,
    expiresIn: '7d',
  })

  const tokenResponse: ITokenResponseDTO = {
    token,
    name,
    id,
  }

  return tokenResponse
}
