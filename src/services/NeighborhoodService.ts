import { Decimal } from '@prisma/client/runtime/library'
import prismaClient from '../lib/prisma'
import { Prisma } from '@prisma/client'

interface CreateNeighborhoodRequest {
  title: string
  price: Decimal
  restaurantId: string
}

interface UpdateNeighborhoodRequest {
  id: string
  title: string
  price: Decimal
  restaurantId: string
}

interface FindNeighborhoodByIdRequest {
  id: string
}

interface DeleteNeighborhoodRequest {
  id: string
}

class NeighborhoodService {
  async findAll() {
    const neighborhood = await prismaClient.neighborhood.findMany()

    return neighborhood
  }
  async findById({ id }: FindNeighborhoodByIdRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }

    const neighborhood = await prismaClient.neighborhood.findMany({
      where: {
        id,
      },
    })

    if (!neighborhood) {
      throw new Error('Bairro não encontrado')
    }

    return neighborhood
  }
  async create({ title, price, restaurantId }: CreateNeighborhoodRequest) {
    if (!title || !restaurantId || price === null || price === undefined) {
      throw new Error('Preencha todos os campos')
    }

    const alreadyExists = await prismaClient.neighborhood.findFirst({
      where: {
        AND: [
          {
            title,
          },
          { restaurantId },
        ],
      },
    })

    if (alreadyExists) {
      throw new Error('Bairro já cadastrado')
    }

    const neighborhood = await prismaClient.neighborhood.create({
      data: {
        title,
        price: new Prisma.Decimal(price),
        restaurantId,
      },
    })

    if (!neighborhood) {
      throw new Error('Erro ao cadastrar bairro')
    }

    return neighborhood
  }

  async update({ id, title, price, restaurantId }: UpdateNeighborhoodRequest) {
    if (!title || !restaurantId || price === null || price === undefined) {
      throw new Error('Preencha todos os campos')
    }

    const neighborhood = await prismaClient.neighborhood.update({
      where: {
        id,
      },
      data: {
        title,
        price: new Prisma.Decimal(price),
        restaurantId,
      },
      select: {
        id: true,
        title: true,
        price: true,
      },
    })

    if (!neighborhood) {
      throw new Error('Erro ao atualizar bairro')
    }

    return neighborhood
  }

  async delete({ id }: DeleteNeighborhoodRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }
    const deleteNeighborhood = await prismaClient.neighborhood.delete({
      where: {
        id,
      },
    })

    if (!deleteNeighborhood) {
      throw new Error('Não foi possível excluir bairro')
    }

    return deleteNeighborhood
  }
}

export default new NeighborhoodService()
