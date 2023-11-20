import { Router } from 'express'
import userTypesRoutes from '../routes/UserTypesRouter'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import userRoutes from '../routes/UserRoutes'
import restaurantRoutes from '../routes/RestaurantRoutes'
import categoryRoutes from '../routes/CategoryRoutes'
import productRoutes from '../routes/ProductRoutes'

const routes = Router()

routes.use('/userTypes', userTypesRoutes)
routes.use('/restaurants', restaurantRoutes)
routes.use('/categories', categoryRoutes)
routes.use('/users', userRoutes)
routes.use('/products', productRoutes)

export default routes
