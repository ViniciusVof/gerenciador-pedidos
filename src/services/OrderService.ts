import prismaClient from '../lib/prisma'

interface CreateOrderRequest {
  customerId: string
  addressId: string
}

interface UpdateOrderRequest {
  id: string
  status: boolean
  draft: boolean
  customerId: string
  addressId: string
}

interface FindOrderByIdRequest {
  id: string
}

interface DeleteOrderRequest {
  id: string
}

class OrderService {
  async findAll() {
    const order = await prismaClient.order.findMany()

    return order
  }
  async findById({ id }: FindOrderByIdRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }

    const order = await prismaClient.order.findMany({
      where: {
        id,
      },
    })

    if (!order) {
      throw new Error('Pedido não encontrado')
    }

    return order
  }
  async create({ customerId, addressId }: CreateOrderRequest) {
    if (!customerId || !addressId) {
      throw new Error('Preencha todos os campos')
    }

    const order = await prismaClient.order.create({
      data: {
        customerId,
        addressId,
      },
    })

    return order
  }
  async update({
    id,
    status,
    draft,
    customerId,
    addressId,
  }: UpdateOrderRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }

    const order = await prismaClient.order.update({
      where: {
        id,
      },
      data: {
        status,
        draft,
        customerId,
        addressId,
      },
    })

    return order
  }
  async delete({ id }: DeleteOrderRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }

    const order = await prismaClient.order.delete({
      where: {
        id,
      },
    })

    return order
  }
}
export default new OrderService()
