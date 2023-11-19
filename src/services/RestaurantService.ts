import prismaClient from '../lib/prisma'

interface CreateRestaurantRequest {
  corporateName: string
  fantasyName: string
  cnpj: string
  phoneNumber: string
  siteName: string
  userId: string
}

interface UpdateRestaurantRequest {
  id: string
  corporateName: string
  fantasyName: string
  cnpj: string
  phoneNumber: string
  siteName: string
  userId: string
}

interface FindRestaurantByIdRequest {
  id: string
}

interface DeleteRestaurantRequest {
  id: string
}

class RestaurantService {
  async findAll() {
    const restaurant = await prismaClient.restaurant.findMany()

    return restaurant
  }
  async findById({ id }: FindRestaurantByIdRequest) {
    const restaurant = await prismaClient.restaurant.findMany({
      where: {
        id,
      },
    })

    if (!restaurant) {
      throw new Error('Restaurante não encontrado')
    }

    return restaurant
  }
  async create({
    corporateName,
    fantasyName,
    cnpj,
    phoneNumber,
    siteName,
    userId,
  }: CreateRestaurantRequest) {
    if (
      !corporateName ||
      !fantasyName ||
      !cnpj ||
      !phoneNumber ||
      !siteName ||
      !userId
    ) {
      throw new Error('Preencha todos os campos')
    }

    const alreadyExists = await prismaClient.restaurant.findFirst({
      where: {
        siteName,
      },
    })

    if (alreadyExists) {
      throw new Error('Restaurante já existe')
    }

    const restaurant = await prismaClient.restaurant.create({
      data: {
        corporateName,
        fantasyName,
        cnpj,
        phoneNumber,
        siteName,
        userId,
      },
    })

    if (!restaurant) {
      throw new Error('Erro ao cadastrar restaurante')
    }

    return restaurant
  }

  async update({
    id,
    corporateName,
    fantasyName,
    cnpj,
    phoneNumber,
    siteName,
    userId,
  }: UpdateRestaurantRequest) {
    if (
      !corporateName ||
      !fantasyName ||
      !cnpj ||
      !phoneNumber ||
      !siteName ||
      !userId
    ) {
      throw new Error('Preencha todos os campos')
    }

    const restaurant = await prismaClient.restaurant.update({
      where: {
        id,
      },
      data: {
        corporateName,
        fantasyName,
        cnpj,
        phoneNumber,
        siteName,
        userId,
      },
      select: {
        id: true,
        corporateName: true,
        fantasyName: true,
        cnpj: true,
        phoneNumber: true,
        siteName: true,
      },
    })

    if (!restaurant) {
      throw new Error('Erro ao atualizar restaurante')
    }

    return restaurant
  }

  async delete({ id }: DeleteRestaurantRequest) {
    const deleteRestaurant = await prismaClient.restaurant.delete({
      where: {
        id,
      },
    })

    if (!deleteRestaurant) {
      throw new Error('Não foi possível excluir o restaurante')
    }

    return deleteRestaurant
  }
}

export default new RestaurantService()
