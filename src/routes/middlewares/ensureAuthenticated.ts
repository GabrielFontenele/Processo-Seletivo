import { NextFunction, Request, Response } from 'express'

import { AppError } from '@shared/errors/AppError'
import { verify } from 'jsonwebtoken'
import { AdminRepositoryPrisma } from '@modules/admin/repositories/prisma/AdminRepositoryPrisma'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const secret = process.env.SECRET ?? ''

  if (!secret) {
    throw new AppError('Internal Error')
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(token, secret) as IPayload

    const adminRepository = new AdminRepositoryPrisma()

    const user = await adminRepository.findUserById(userId)

    if (!user) throw new AppError('User not found', 401)

    request.user = {
      id: userId,
      admin: user.admin,
    }

    next()
  } catch {
    throw new AppError('Invalid token', 401)
  }
}
