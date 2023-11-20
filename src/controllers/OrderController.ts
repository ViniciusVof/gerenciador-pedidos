import { Request, Response } from 'express'
import OrderService from '../services/OrderService'

class OrderController {
  async CreateOrder(req: Request, res: Response) {
    const { customerId, addressId } = req.body

    const orderResponse = await OrderService.create({
      customerId,
      addressId,
    })

    return res.json(orderResponse)
  }
  async UpdateOrder(req: Request, res: Response) {
    const { id } = req.params
    const { status, draft, customerId, addressId } = req.body

    const orderResponse = await OrderService.update({
      id,
      status,
      draft,
      customerId,
      addressId,
    })

    return res.json(orderResponse)
  }
  async DeleteOrder(req: Request, res: Response) {
    const { id } = req.params

    const orderResponse = await OrderService.delete({ id })

    return res.json(orderResponse)
  }
  async ReadOrder(req: Request, res: Response) {
    const orderResponse = await OrderService.findAll()

    return res.json(orderResponse)
  }
}

export default new OrderController()
