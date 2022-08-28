import { Router } from 'express'
import { InscreverAlunoController } from 'processoSeletivo/useCases/inscreverAluno/InscreverAlunoController'
import { processoSeletivoDataValidation } from './middlewares/processoSeletivoDataValidation'

export const processoSeletivoRoutes = Router()

const inscreverAlunoController = new InscreverAlunoController()

processoSeletivoRoutes.post(
  '/',
  processoSeletivoDataValidation,
  inscreverAlunoController.handle,
)
