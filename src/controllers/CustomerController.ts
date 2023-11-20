import { Request, Response } from 'express'
import CustomerService from '../services/CustomerService'

class UserController {
  async AuthenticateUser(req: Request, res: Response) {
    const { email, password } = req.body
    const customer = await CustomerService.authenticate({ email, password })

    return res.json(customer)
  }
  async CreateUser(req: Request, res: Response) {
    const { fullname, email, password, phoneNumber, restaurantId } = req.body

    const customer = await CustomerService.create({
      fullname,
      email,
      password,
      phoneNumber,
      restaurantId,
    })

    return res.json(customer)
  }
  async UpdateUser(req: Request, res: Response) {
    const { id } = req.params
    const { fullname, email, password, phoneNumber, restaurantId } = req.body

    const customer = await CustomerService.update({
      id,
      fullname,
      email,
      password,
      phoneNumber,
      restaurantId,
    })

    return res.json(customer)
  }
  async DeleteUser(req: Request, res: Response) {
    const { id } = req.params

    const customer = await CustomerService.delete({ id })

    return res.json(customer)
  }
  async ReadUser(req: Request, res: Response) {
    const customer = await CustomerService.findAll()

    return res.json(customer)
  }
}

export default new UserController()
