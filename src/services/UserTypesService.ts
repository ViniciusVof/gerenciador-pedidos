import { Prisma } from '@prisma/client'
import prismaClient from '../lib/prisma'

interface CreateUserTypesRequest {
  name: string
  price: Prisma.Decimal
}

interface UpdateUserTypesRequest {
  id: string
  name: string
  price: Prisma.Decimal
}

interface FindUserByIdTypesRequest {
  id: string
}

interface DeleteUserTypesRequest {
  id: string
}

class UserTypesService {
  async findAll() {
    const userTypes = await prismaClient.userTypes.findMany()

    return userTypes
  }
  async findById({ id }: FindUserByIdTypesRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }
    const userTypes = await prismaClient.userTypes.findMany({
      where: {
        id,
      },
    })

    if (!userTypes) {
      throw new Error('Tipo de usuário não encontrado')
    }

    return userTypes
  }
  async create({ name, price }: CreateUserTypesRequest) {
    if (!name || price === null || price === undefined) {
      throw new Error('Preencha todos os campos')
    }

    const alreadyExists = await prismaClient.userTypes.findFirst({
      where: {
        name,
      },
    })

    if (alreadyExists) {
      throw new Error('Tipo de usuário já existe')
    }

    const userTypes = await prismaClient.userTypes.create({
      data: {
        name,
        price: new Prisma.Decimal(price),
      },
      select: {
        id: true,
        name: true,
        price: true,
      },
    })

    if (!userTypes) {
      throw new Error('Erro ao cadastrar tipo de usuário')
    }

    return userTypes
  }

  async update({ id, name, price }: UpdateUserTypesRequest) {
    if (!id || !name || price === null || price === undefined) {
      throw new Error('Preencha todos os campos')
    }

    const userTypes = await prismaClient.userTypes.update({
      where: {
        id,
      },
      data: {
        name,
        price: new Prisma.Decimal(price),
      },
      select: {
        id: true,
        name: true,
        price: true,
      },
    })

    if (!userTypes) {
      throw new Error('Erro ao atualizar tipo de usuário')
    }

    return userTypes
  }

  async delete({ id }: DeleteUserTypesRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }
    const deleteUserType = await prismaClient.userTypes.delete({
      where: {
        id,
      },
    })

    if (!deleteUserType) {
      throw new Error('Não foi possível excluir o tipo do usuário')
    }

    return deleteUserType
  }
}

export default new UserTypesService()
