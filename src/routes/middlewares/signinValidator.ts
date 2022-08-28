import { NextFunction, Request, Response } from 'express'
import * as z from 'zod'

export async function signinValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const dataSchema = z.object({
    body: z.object({
      email: z
        .string({
          required_error: 'E-mail não pode estar vazio',
        })
        .email('E-mail invalido'),
      password: z.string({
        required_error: 'Senha não pode estar vazio',
      }),
    }),
  })

  try {
    await dataSchema.parseAsync({
      body: req.body,
    })
    return next()
  } catch (error) {
    return res.status(400).json(error)
  }
}
