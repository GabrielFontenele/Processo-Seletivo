import { AuthenticateUserController } from '@modules/admin/useCases/authenticateUser/AuthenticateUserController'
import { ListInscritosController } from '@modules/admin/useCases/listInscritos/ListInscritosController'
import { Router } from 'express'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { signinValidator } from './middlewares/signinValidator'
import { genericZodValidator } from './middlewares/genericZodValidator'
import { pageDataSchema } from './middlewares/pageValidation'
import { ListMatriculadosController } from '@modules/admin/useCases/listMatriculados/ListMatriculadosController'
import { SetMatriculadoController } from '@modules/admin/useCases/setMatriculado/SetMatriculadoController'
import { GetAlunosSheetController } from '@modules/admin/useCases/getAlunosSheet/GetAlunosSheetController'

export const adminRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
const listInscritosController = new ListInscritosController()
const listMatriculadosController = new ListMatriculadosController()
const setMatriculadoController = new SetMatriculadoController()
const getAlunosSheetController = new GetAlunosSheetController()

adminRoutes.post('/signin', signinValidator, authenticateUserController.handle)

adminRoutes.use(ensureAuthenticated, ensureAdmin)

adminRoutes.get(
  '/listInscritos',
  genericZodValidator(pageDataSchema),
  listInscritosController.handle,
)

adminRoutes.get(
  '/listMatriculados',
  genericZodValidator(pageDataSchema),
  listMatriculadosController.handle,
)

adminRoutes.put('/matricularAluno', setMatriculadoController.handle)

adminRoutes.get('/alunosSheet', getAlunosSheetController.handle)
