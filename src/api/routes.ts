import { Router } from 'express'
import userTypesRoutes from '../routes/UserTypesRouter'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import userRoutes from '../routes/UserRoutes'
import restaurantRoutes from '../routes/RestaurantRoutes'
import categoryRoutes from '../routes/CategoryRoutes'

const routes = Router()

routes.use(isAuthenticated).use('/userTypes', userTypesRoutes)
routes.use(isAuthenticated).use('/restaurants', restaurantRoutes)
routes.use(isAuthenticated).use('/categories', categoryRoutes)
routes.use('/users', userRoutes)

export default routes
