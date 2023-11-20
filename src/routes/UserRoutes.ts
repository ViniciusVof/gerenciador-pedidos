import { Router } from 'express'
import UserController from '../controllers/UserController'
import { isAuthenticated } from '../middlewares/isAuthenticated'

const userRoutes = Router()

userRoutes.route('/auth').post(UserController.AuthenticateUser)
userRoutes.route('/list').get(isAuthenticated, UserController.ReadUser)
userRoutes.route('/create').post(UserController.CreateUser)
userRoutes.route('/update/:id').put(isAuthenticated, UserController.UpdateUser)
userRoutes
  .route('/delete/:id')
  .delete(isAuthenticated, UserController.DeleteUser)

export default userRoutes
