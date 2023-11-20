import { Router } from 'express'
import UserTypesController from '../controllers/UserTypesController'
import { isAuthenticated } from '../middlewares/isAuthenticated'

const userTypesRoutes = Router()

userTypesRoutes
  .route('/list')
  .get(isAuthenticated, UserTypesController.ReadUserTypes)
userTypesRoutes
  .route('/create')
  .post(isAuthenticated, UserTypesController.CreateUserTypes)
userTypesRoutes
  .route('/update/:id')
  .put(isAuthenticated, UserTypesController.UpdateUserTypes)
userTypesRoutes
  .route('/delete/:id')
  .delete(isAuthenticated, UserTypesController.DeleteUserTypes)

export default userTypesRoutes
