import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { admin } = request.user

  if (!admin) throw new AppError('User is not admin')

  return next()
}
