import { Router } from 'express'
import OrderController from '../controllers/OrderController'
import { isAuthenticated } from '../middlewares/isAuthenticated'

const orderRoutes = Router()

orderRoutes.route('/list').get(isAuthenticated, OrderController.ReadOrder)
orderRoutes.route('/create').post(OrderController.CreateOrder)
orderRoutes
  .route('/update/:id')
  .put(isAuthenticated, OrderController.UpdateOrder)
orderRoutes
  .route('/delete/:id')
  .delete(isAuthenticated, OrderController.DeleteOrder)

export default orderRoutes
