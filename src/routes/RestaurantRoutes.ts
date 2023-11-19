import { Router } from 'express'
import RestaurantController from '../controllers/RestaurantController'

const restaurantRoutes = Router()

restaurantRoutes.route('/list').get(RestaurantController.ReadRestaurant)
restaurantRoutes.route('/create').post(RestaurantController.CreateRestaurant)
restaurantRoutes.route('/update/:id').put(RestaurantController.UpdateRestaurant)
restaurantRoutes
  .route('/delete/:id')
  .delete(RestaurantController.DeleteRestaurant)

export default restaurantRoutes
