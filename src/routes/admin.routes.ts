import { AuthenticateUserController } from '@modules/admin/useCases/authenticateUser/AuthenticateUserController'
import { Router } from 'express'
import { signinValidator } from './middlewares/signinValidator'

export const adminRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

adminRoutes.post('/signin', signinValidator, authenticateUserController.handle)
