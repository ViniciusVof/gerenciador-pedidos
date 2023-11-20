import { Router } from 'express'
import CategoryController from '../controllers/CategoryController'
import { isAuthenticated } from '../middlewares/isAuthenticated'

const categoryRoutes = Router()

categoryRoutes
  .route('/list')
  .get(isAuthenticated, CategoryController.ReadCategory)
categoryRoutes
  .route('/create')
  .post(isAuthenticated, CategoryController.CreateCategory)
categoryRoutes
  .route('/update/:id')
  .put(isAuthenticated, CategoryController.UpdateCategory)
categoryRoutes
  .route('/delete/:id')
  .delete(isAuthenticated, CategoryController.DeleteCategory)

export default categoryRoutes
