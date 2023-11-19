import { Request, Response, Router } from 'express'
import userTypesRoutes from '../routes/UserTypesRouter'
import { isAuthenticated } from '../middlewares/isAuthenticated'

const routes = Router()

routes.use('/users/types', userTypesRoutes)

export default routes
