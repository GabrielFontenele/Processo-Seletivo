import { AdminRepositoryPrisma } from '@modules/admin/repositories/prisma/AdminRepositoryPrisma'
import { Request, Response } from 'express'

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body

    const adminRepositoryPrisma = new AdminRepositoryPrisma()
    const authenticateUserUseCase = new AuthenticateUserUseCase(
      adminRepositoryPrisma,
    )

    const token = await authenticateUserUseCase.execute({ password, email })

    return response.json(token)
  }
}
