import { Request, Response } from 'express'
import UserService from '../services/UserService'

class UserController {
  async AuthenticateUser(req: Request, res: Response) {
    const { email, password } = req.body
    const user = await UserService.authenticate({ email, password })

    return res.json(user)
  }
  async CreateUser(req: Request, res: Response) {
    const { fullname, email, password, phoneNumber, userTypesId } = req.body

    const user = await UserService.create({
      fullname,
      email,
      password,
      phoneNumber,
      userTypesId,
    })

    return res.json(user)
  }
  async UpdateUser(req: Request, res: Response) {
    const { id } = req.params
    const { fullname, email, password, phoneNumber, userTypesId } = req.body

    const user = await UserService.update({
      id,
      fullname,
      email,
      password,
      phoneNumber,
      userTypesId,
    })

    return res.json(user)
  }
  async DeleteUser(req: Request, res: Response) {
    const { id } = req.params

    const user = await UserService.delete({ id })

    return res.json(user)
  }
  async ReadUser(req: Request, res: Response) {
    const user = await UserService.findAll()

    return res.json(user)
  }
}

export default new UserController()
