import { compare, hash } from 'bcryptjs'
import prismaClient from '../lib/prisma'
import jwt from '../utils/jwt'

interface AuthCustomerRequest {
  email: string
  password: string
}

interface CreateCustomerRequest {
  fullname: string
  email: string
  password: string
  phoneNumber: string
  restaurantId: string
}

interface UpdateCustomerRequest {
  id: string
  fullname: string
  email: string
  password: string
  phoneNumber: string
  restaurantId: string
}

interface FindCustomerByIdRequest {
  id: string
}

interface DeleteCustomerRequest {
  id: string
}

class CustomerService {
  async findAll() {
    const user = await prismaClient.customer.findMany()

    return user
  }
  async findById({ id }: FindCustomerByIdRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }
    const user = await prismaClient.customer.findMany({
      where: {
        id,
      },
    })

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    return user
  }
  async create({
    fullname,
    email,
    password,
    phoneNumber,
    restaurantId,
  }: CreateCustomerRequest) {
    if (!fullname || !email || !password || !phoneNumber || !restaurantId) {
      throw new Error('Preencha todos os campos')
    }

    const alreadyExists = await prismaClient.customer.findFirst({
      where: {
        email,
      },
    })

    if (alreadyExists) {
      throw new Error('Usuário já existe')
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.customer.create({
      data: {
        fullname,
        email,
        password: passwordHash,
        phoneNumber,
        restaurantId,
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        phoneNumber: true,
        restaurantId: true,
      },
    })

    if (!user) {
      throw new Error('Erro ao cadastrar usuário')
    }

    return user
  }

  async update({
    id,
    fullname,
    email,
    password,
    phoneNumber,
    restaurantId,
  }: UpdateCustomerRequest) {
    if (
      !id ||
      !fullname ||
      !email ||
      !password ||
      !phoneNumber ||
      !restaurantId
    ) {
      throw new Error('Preencha todos os campos')
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.customer.update({
      where: {
        id,
      },
      data: {
        fullname,
        email,
        password: passwordHash,
        phoneNumber,
        restaurantId,
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        phoneNumber: true,
        restaurantId: true,
      },
    })

    if (!user) {
      throw new Error('Erro ao atualizar usuário')
    }

    return user
  }

  async delete({ id }: DeleteCustomerRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }
    const deleteCustomer = await prismaClient.customer.delete({
      where: {
        id,
      },
    })

    if (!deleteCustomer) {
      throw new Error('Não foi possível excluir o usuário')
    }

    return deleteCustomer
  }

  async authenticate({ email, password }: AuthCustomerRequest) {
    if (!email || !password) {
      throw new Error('Preencha todos os campos')
    }

    const user = await prismaClient.customer.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      throw new Error('Usuário não existe')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Senha incorreta')
    }

    const token = jwt.signCustomer({
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      restaurantId: user.restaurantId,
    })

    return {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      restaurantId: user.restaurantId,
      token,
    }
  }
}

export default new CustomerService()
