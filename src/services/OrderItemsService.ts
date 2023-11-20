import prismaClient from '../lib/prisma'
interface CreateOrderItemsRequest {
  amount: number
  orderId: string
  productId: string
}

interface UpdateOrderItemsRequest {
  id: string
  amount: number
  orderId: string
  productId: string
}

interface FindOrderItemsByIdRequest {
  id: string
}

interface DeleteOrderItemsRequest {
  id: string
}

class OrderItemsService {
  async findAll() {
    const orderItems = await prismaClient.orderItems.findMany()

    return orderItems
  }
  async findById({ id }: FindOrderItemsByIdRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }

    const orderItems = await prismaClient.orderItems.findMany({
      where: {
        id,
      },
    })

    if (!orderItems) {
      throw new Error('Item do pedido não encontrado')
    }

    return orderItems
  }
  async create({ amount, orderId, productId }: CreateOrderItemsRequest) {
    if (!amount || !orderId || !productId) {
      throw new Error('Preencha todos os campos')
    }

    const orderItems = await prismaClient.orderItems.create({
      data: {
        amount,
        orderId,
        productId,
      },
    })

    return orderItems
  }
  async update({ id, amount, orderId, productId }: UpdateOrderItemsRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }

    const orderItems = await prismaClient.orderItems.update({
      where: {
        id,
      },
      data: {
        amount,
        orderId,
        productId,
      },
    })

    return orderItems
  }
  async delete({ id }: DeleteOrderItemsRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }

    const orderItems = await prismaClient.orderItems.delete({
      where: {
        id,
      },
    })

    return orderItems
  }
}

export default new OrderItemsService()
