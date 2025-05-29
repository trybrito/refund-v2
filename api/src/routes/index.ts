import { Router } from 'express'
import { sessionsRoutes } from './sessions-routes'
import { usersRoutes } from './users-routes'

const routes = Router()

// Public routes
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)

export { routes }
