import { number, z } from 'zod'

export const pageDataSchema = z.object({
  query: z.object({
    page: z.preprocess(
      (arg) => {
        if (typeof arg === 'string' || arg instanceof number)
          return Number(arg as string)
      },
      z
        .number({
          required_error: 'Pagina não pode estar vazio',
          invalid_type_error: 'Pagina deve ser um numero',
        })
        .min(1, { message: 'Pagina deve ser maior que zero' }),
    ),
  }),
})
