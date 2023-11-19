import { Request, Response, Router } from 'express'
import userTypesRoutes from '../routes/UserTypesRouter'

const routes = Router()

routes.use('/users/types', userTypesRoutes)

export default routes
