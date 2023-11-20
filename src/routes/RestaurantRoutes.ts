import { Router } from 'express'
import RestaurantController from '../controllers/RestaurantController'
import { isAuthenticated } from '../middlewares/isAuthenticated'

const restaurantRoutes = Router()

restaurantRoutes
  .route('/list')
  .get(isAuthenticated, RestaurantController.ReadRestaurant)
restaurantRoutes
  .route('/create')
  .post(isAuthenticated, RestaurantController.CreateRestaurant)
restaurantRoutes
  .route('/update/:id')
  .put(isAuthenticated, RestaurantController.UpdateRestaurant)
restaurantRoutes
  .route('/delete/:id')
  .delete(isAuthenticated, RestaurantController.DeleteRestaurant)

export default restaurantRoutes
