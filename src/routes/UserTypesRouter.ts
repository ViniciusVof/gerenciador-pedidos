import { Router } from 'express'
import UserTypesController from '../controllers/UserTypesController'

const userTypesRoutes = Router()

userTypesRoutes.route('/').get(UserTypesController.ReadUserTypes)
userTypesRoutes.route('/').post(UserTypesController.CreateUserTypes)
userTypesRoutes.route('/:id').put(UserTypesController.UpdateUserTypes)
userTypesRoutes.route('/:id').delete(UserTypesController.DeleteUserTypes)

export default userTypesRoutes