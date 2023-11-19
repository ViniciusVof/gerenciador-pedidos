import { Router } from 'express'
import CategoryController from '../controllers/CategoryController'

const categoryRoutes = Router()

categoryRoutes.route('/list').get(CategoryController.ReadCategory)
categoryRoutes.route('/create').post(CategoryController.CreateCategory)
categoryRoutes.route('/update/:id').put(CategoryController.UpdateCategory)
categoryRoutes.route('/delete/:id').delete(CategoryController.DeleteCategory)

export default categoryRoutes
