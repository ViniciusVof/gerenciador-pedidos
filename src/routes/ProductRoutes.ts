import { Router } from 'express'
import ProductController from '../controllers/ProductController'
import multer from 'multer'
import uploadConfig from '../api/multer'
import { isAuthenticated } from '../middlewares/isAuthenticated'
const productRoutes = Router()

const upload = multer(uploadConfig.upload('./uploads'))

productRoutes.route('/list').get(isAuthenticated, ProductController.ReadProduct)
productRoutes
  .route('/create')
  .post(isAuthenticated, upload.single('file'), ProductController.CreateProduct)
productRoutes
  .route('/update/:id')
  .put(isAuthenticated, upload.single('file'), ProductController.UpdateProduct)
productRoutes
  .route('/delete/:id')
  .delete(isAuthenticated, ProductController.DeleteProduct)

export default productRoutes
