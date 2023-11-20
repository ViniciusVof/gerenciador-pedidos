import { Router } from 'express'
import OrderItemsController from '../controllers/OrderItemsController'
import { isAuthenticated } from '../middlewares/isAuthenticated'
const orderItemsRoutes = Router()
orderItemsRoutes
  .route('/list')
  .get(isAuthenticated, OrderItemsController.ReadOrderItems)
orderItemsRoutes
  .route('/create')
  .post(isAuthenticated, OrderItemsController.CreateOrderItems)
orderItemsRoutes
  .route('/update/:id')
  .put(isAuthenticated, OrderItemsController.UpdateOrderItems)

orderItemsRoutes
  .route('/delete/:id')
  .delete(isAuthenticated, OrderItemsController.DeleteOrderItems)

export default orderItemsRoutes
