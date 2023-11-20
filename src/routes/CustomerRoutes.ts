import { Router } from 'express'
import CustomerController from '../controllers/CustomerController'
import { isAuthenticated } from '../middlewares/isAuthenticated'

const customerRoutes = Router()

customerRoutes.route('/auth').post(CustomerController.AuthenticateUser)
customerRoutes.route('/list').get(isAuthenticated, CustomerController.ReadUser)
customerRoutes.route('/create').post(CustomerController.CreateUser)
customerRoutes
  .route('/update/:id')
  .put(isAuthenticated, CustomerController.UpdateUser)
customerRoutes
  .route('/delete/:id')
  .delete(isAuthenticated, CustomerController.DeleteUser)

export default customerRoutes
