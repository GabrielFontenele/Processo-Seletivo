import { compare } from 'bcryptjs'

import { AppError } from '@shared/errors/AppError'
import { createAuthToken } from '@shared/helpers/createAuthToken'
import { ITokenResponseDTO } from '@modules/admin/dtos/ITokenResponseDTO'
import { IAdminRepository } from '@modules/admin/repositories/IAdminRepository'

interface IRequest {
  email: string
  password: string
}

export class AuthenticateUserUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute({ email, password }: IRequest): Promise<ITokenResponseDTO> {
    const user = await this.adminRepository.findUserByEmail(email)

    if (!user) {
      throw new AppError('Email or password incorrect!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!')
    }

    const tokenReturn: ITokenResponseDTO = createAuthToken(user.id, user.name)

    return tokenReturn
  }
}
