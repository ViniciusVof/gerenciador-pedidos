import { Request, Response } from 'express'
import UserTypesService from '../services/UserTypesService'

class UserTypesController {
  async CreateUserTypes(req: Request, res: Response) {
    const { name, price } = req.body

    const user = await UserTypesService.create({ name, price })

    return res.json(user)
  }
  async UpdateUserTypes(req: Request, res: Response) {
    const { id } = req.params
    const { name, price } = req.body

    const user = await UserTypesService.update({ id, name, price })

    return res.json(user)
  }
  async DeleteUserTypes(req: Request, res: Response) {
    const { id } = req.params

    const user = await UserTypesService.delete({ id })

    return res.json(user)
  }
  async ReadUserTypes(req: Request, res: Response) {
    const user = await UserTypesService.findAll()

    return res.json(user)
  }
}

export default new UserTypesController()
