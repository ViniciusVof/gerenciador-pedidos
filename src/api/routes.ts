import { Router } from 'express'
import userTypesRoutes from '../routes/UserTypesRouter'
import userRoutes from '../routes/UserRoutes'
import restaurantRoutes from '../routes/RestaurantRoutes'
import categoryRoutes from '../routes/CategoryRoutes'
import productRoutes from '../routes/ProductRoutes'
import customerRoutes from '../routes/CustomerRoutes'
import neighborhoodRoutes from '../routes/NeighborhoodRoutes'

const routes = Router()

routes.use('/userTypes', userTypesRoutes)
routes.use('/restaurants', restaurantRoutes)
routes.use('/categories', categoryRoutes)
routes.use('/users', userRoutes)
routes.use('/products', productRoutes)
routes.use('/customers', customerRoutes)
routes.use('/neighborhoods', neighborhoodRoutes)

export default routes
