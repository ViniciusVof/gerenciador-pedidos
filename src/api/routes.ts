import { Router } from 'express'
import userTypesRoutes from '../routes/UserTypesRouter'
import userRoutes from '../routes/UserRoutes'
import restaurantRoutes from '../routes/RestaurantRoutes'
import categoryRoutes from '../routes/CategoryRoutes'
import productRoutes from '../routes/ProductRoutes'
import customerRoutes from '../routes/CustomerRoutes'
import neighborhoodRoutes from '../routes/NeighborhoodRoutes'
import addressRoutes from '../routes/AddressRoutes'
import ordersRoutes from '../routes/OrderRoutes'

const routes = Router()

routes.use('/userTypes', userTypesRoutes)
routes.use('/restaurants', restaurantRoutes)
routes.use('/categories', categoryRoutes)
routes.use('/users', userRoutes)
routes.use('/products', productRoutes)
routes.use('/customers', customerRoutes)
routes.use('/neighborhoods', neighborhoodRoutes)
routes.use('/address', addressRoutes)
routes.use('/orders', ordersRoutes)

export default routes
