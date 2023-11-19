import { Request, Response } from 'express'
import RestaurantService from '../services/RestaurantService'

class RestaurantController {
  async CreateRestaurant(req: Request, res: Response) {
    const { corporateName, fantasyName, cnpj, phoneNumber, siteName, userId } =
      req.body

    const restaurant = await RestaurantService.create({
      corporateName,
      fantasyName,
      cnpj,
      phoneNumber,
      siteName,
      userId,
    })

    return res.json(restaurant)
  }
  async UpdateRestaurant(req: Request, res: Response) {
    const { id } = req.params
    const { corporateName, fantasyName, cnpj, phoneNumber, siteName, userId } =
      req.body

    const restaurant = await RestaurantService.update({
      id,
      corporateName,
      fantasyName,
      cnpj,
      phoneNumber,
      siteName,
      userId,
    })

    return res.json(restaurant)
  }
  async DeleteRestaurant(req: Request, res: Response) {
    const { id } = req.params

    const restaurant = await RestaurantService.delete({ id })

    return res.json(restaurant)
  }
  async ReadRestaurant(req: Request, res: Response) {
    const restaurant = await RestaurantService.findAll()

    return res.json(restaurant)
  }
}

export default new RestaurantController()
