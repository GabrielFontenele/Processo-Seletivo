import { Router } from 'express'
import { processoSeletivoRoutes } from './processoSeletivo.routes'

export const router = Router()

router.use('/processo', processoSeletivoRoutes)
