import { Request, Response } from 'express'
import OrderItemsService from '../services/OrderItemsService'

class OrderItemsController {
  async CreateOrderItems(req: Request, res: Response) {
    const { amount, orderId, productId } = req.body

    const orderItemsResponse = await OrderItemsService.create({
      amount,
      orderId,
      productId,
    })

    return res.json(orderItemsResponse)
  }
  async UpdateOrderItems(req: Request, res: Response) {
    const { id } = req.params
    const { amount, orderId, productId } = req.body

    const orderItemsResponse = await OrderItemsService.update({
      id,
      amount,
      orderId,
      productId,
    })

    return res.json(orderItemsResponse)
  }
  async DeleteOrderItems(req: Request, res: Response) {
    const { id } = req.params

    const orderItemsResponse = await OrderItemsService.delete({ id })

    return res.json(orderItemsResponse)
  }
  async ReadOrderItems(req: Request, res: Response) {
    const orderItemsResponse = await OrderItemsService.findAll()

    return res.json(orderItemsResponse)
  }
}

export default new OrderItemsController()
