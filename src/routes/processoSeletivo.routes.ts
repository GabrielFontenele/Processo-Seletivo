import { Router } from 'express'
import { InscreverAlunoController } from 'processoSeletivo/useCases/inscreverAluno/InscreverAlunoController'
import { ListSeriesController } from 'processoSeletivo/useCases/listSeries/ListSeriesController'
import { ListTurnosController } from 'processoSeletivo/useCases/listTurno/ListSeriesController'
import { processoSeletivoDataValidation } from './middlewares/processoSeletivoDataValidation'

export const processoSeletivoRoutes = Router()

const inscreverAlunoController = new InscreverAlunoController()
const listSeriesController = new ListSeriesController()
const listTurnosController = new ListTurnosController()

processoSeletivoRoutes.get('/series', listSeriesController.handle)
processoSeletivoRoutes.get('/turnos', listTurnosController.handle)

processoSeletivoRoutes.post(
  '/',
  processoSeletivoDataValidation,
  inscreverAlunoController.handle,
)
