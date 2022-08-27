import { Router } from 'express'
import { InscreverAlunoController } from 'processoSeletivo/useCases/inscreverAluno/InscreverAlunoController'

export const processoSeletivoRoutes = Router()

const inscreverAlunoController = new InscreverAlunoController()

processoSeletivoRoutes.post('/', inscreverAlunoController.handle)
