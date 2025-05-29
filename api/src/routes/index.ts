import { ensureAuthenticated } from '@/middlewares/ensure-authenticated'
import { Router } from 'express'
import { refundsRoutes } from './refunds-routes'
import { sessionsRoutes } from './sessions-routes'
import { usersRoutes } from './users-routes'

const routes = Router()

// Public routes
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)

// Private routes
routes.use(ensureAuthenticated)
routes.use('/refunds', refundsRoutes)

export { routes }
