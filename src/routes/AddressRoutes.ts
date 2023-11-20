import { Router } from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import AddressController from '../controllers/AddressController'

const addressRoutes = Router()

addressRoutes
  .route('/create')
  .post(isAuthenticated, AddressController.CreateAddress)
addressRoutes
  .route('/update/:id')
  .put(isAuthenticated, AddressController.UpdateAddress)
addressRoutes
  .route('/delete/:id')
  .delete(isAuthenticated, AddressController.DeleteAddress)
addressRoutes.route('/list').get(isAuthenticated, AddressController.ReadAddress)

export default addressRoutes
