import { AuthenticateUserController } from '@modules/admin/useCases/authenticateUser/AuthenticateUserController'
import { ListInscritosController } from '@modules/admin/useCases/listInscritos/ListInscritosController'
import { Router } from 'express'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { signinValidator } from './middlewares/signinValidator'
import { genericZodValidator } from './middlewares/genericZodValidator'
import { pageDataSchema } from './middlewares/pageValidation'

export const adminRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
const listInscritosController = new ListInscritosController()

adminRoutes.post('/signin', signinValidator, authenticateUserController.handle)

adminRoutes.use(ensureAuthenticated, ensureAdmin)

adminRoutes.post(
  '/listInscritos',
  genericZodValidator(pageDataSchema),
  listInscritosController.handle,
)
