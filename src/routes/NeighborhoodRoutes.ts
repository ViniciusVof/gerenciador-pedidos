import { Router } from 'express'
import NeighborhoodController from '../controllers/NeighborhoodController'
import { isAuthenticated } from '../middlewares/isAuthenticated'

const neighborhoodRoutes = Router()

neighborhoodRoutes
  .route('/list')
  .get(isAuthenticated, NeighborhoodController.ReadNeighborhood)
neighborhoodRoutes
  .route('/create')
  .post(isAuthenticated, NeighborhoodController.CreateNeighborhood)
neighborhoodRoutes
  .route('/update/:id')
  .put(isAuthenticated, NeighborhoodController.UpdateNeighborhood)
neighborhoodRoutes
  .route('/delete/:id')
  .delete(isAuthenticated, NeighborhoodController.DeleteNeighborhood)

export default neighborhoodRoutes
