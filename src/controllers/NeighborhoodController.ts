import { Request, Response } from 'express'
import NeighborhoodService from '../services/NeighborhoodService'

class NeighborhoodController {
  async CreateNeighborhood(req: Request, res: Response) {
    const { title, price, restaurantId } = req.body

    const neighborhood = await NeighborhoodService.create({
      title,
      price,
      restaurantId,
    })

    return res.json(neighborhood)
  }
  async UpdateNeighborhood(req: Request, res: Response) {
    const { id } = req.params
    const { title, price, restaurantId } = req.body

    const neighborhood = await NeighborhoodService.update({
      id,
      title,
      price,
      restaurantId,
    })

    return res.json(neighborhood)
  }
  async DeleteNeighborhood(req: Request, res: Response) {
    const { id } = req.params

    const neighborhood = await NeighborhoodService.delete({ id })

    return res.json(neighborhood)
  }
  async ReadNeighborhood(req: Request, res: Response) {
    const neighborhood = await NeighborhoodService.findAll()

    return res.json(neighborhood)
  }
}

export default new NeighborhoodController()
