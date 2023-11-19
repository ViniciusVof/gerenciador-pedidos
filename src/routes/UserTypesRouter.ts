import { Router } from 'express'
import UserTypesController from '../controllers/UserTypesController'

const userTypesRoutes = Router()

userTypesRoutes.route('/list').get(UserTypesController.ReadUserTypes)
userTypesRoutes.route('/create').post(UserTypesController.CreateUserTypes)
userTypesRoutes.route('/update/:id').put(UserTypesController.UpdateUserTypes)
userTypesRoutes.route('/delete/:id').delete(UserTypesController.DeleteUserTypes)

export default userTypesRoutes
