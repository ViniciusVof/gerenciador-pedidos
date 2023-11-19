import { Request, Response, Router } from 'express'
import userTypesRoutes from '../routes/UserTypesRouter'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import userRoutes from '../routes/UserRoutes'

const routes = Router()

routes.use(isAuthenticated).use('/userTypes', userTypesRoutes)
routes.use('/users', userRoutes)

export default routes
