import { Router } from 'express'
import { adminRoutes } from './admin.routes'
import { processoSeletivoRoutes } from './processoSeletivo.routes'

export const router = Router()

router.use('/processo', processoSeletivoRoutes)
router.use('/admin', adminRoutes)
