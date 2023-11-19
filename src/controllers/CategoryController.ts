import { Request, Response } from 'express'
import CategoryService from '../services/CategoryService'

class CategoryController {
  async CreateCategory(req: Request, res: Response) {
    const { name, restaurantId } = req.body

    const category = await CategoryService.create({
      name,
      restaurantId,
    })

    return res.json(category)
  }
  async UpdateCategory(req: Request, res: Response) {
    const { id } = req.params
    const { name, restaurantId } = req.body

    const category = await CategoryService.update({
      id,
      name,
      restaurantId,
    })

    return res.json(category)
  }
  async DeleteCategory(req: Request, res: Response) {
    const { id } = req.params

    const category = await CategoryService.delete({ id })

    return res.json(category)
  }
  async ReadCategory(req: Request, res: Response) {
    const category = await CategoryService.findAll()

    return res.json(category)
  }
}

export default new CategoryController()
