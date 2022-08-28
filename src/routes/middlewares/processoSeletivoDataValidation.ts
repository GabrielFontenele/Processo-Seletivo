import { NextFunction, Request, Response } from 'express'
import * as z from 'zod'

export async function processoSeletivoDataValidation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const dataSchema = z.object({
    body: z.object({
      aluno: z.object({
        nome: z.string({ required_error: 'Nome não pode estar vazio' }),
        nascimento: z.preprocess(
          (arg) => {
            if (typeof arg === 'string' || arg instanceof Date)
              return new Date(arg)
          },
          z.date({
            required_error: 'Data de nascimento não pode estar vazio',
            invalid_type_error: 'formato de data de nascimento invalido',
          }),
        ),
        cpf: z
          .string({ required_error: 'Cpf não pode estar vazio' })
          .regex(
            /([0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2})/g,
            'Cpf não estar no formato valido: 123.456.789-00',
          ),
        email: z
          .string({
            required_error: 'E-mail não pode estar vazio',
          })
          .email('E-mail invalido'),
        serieId: z
          .string({ required_error: 'Serie não pode estar vazio' })
          .uuid({ message: 'Id da serie invalido' }),
        turnoId: z
          .string({ required_error: 'Turno não pode estar vazio' })
          .uuid({ message: 'Id da turno invalido' }),
        cidade: z.string({ required_error: 'Cidade não pode estar vazio' }),
        estado: z.string({ required_error: 'Estado não pode estar vazio' }),
      }),
      responsavel: z.object({
        nome: z.string({
          required_error: 'Nome do responsável não pode estar vazio',
        }),
        email: z
          .string({
            required_error: 'E-mail do responsável não pode estar vazio',
          })
          .email('E-mail do responsável invalido'),
        telefone: z.string({ required_error: 'Telefone não pode estar vazio' }),
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
