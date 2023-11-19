import { compare, hash } from 'bcryptjs'
import prismaClient from '../lib/prisma'
import jwt from '../utils/jwt'

interface AuthUserRequest {
  email: string
  password: string
}

interface CreateUserRequest {
  fullname: string
  email: string
  password: string
  phoneNumber: string
  userTypesId: string
}

interface UpdateUserRequest {
  id: string
  fullname: string
  email: string
  password: string
  phoneNumber: string
  userTypesId: string
}

interface FindUserByIdRequest {
  id: string
}

interface DeleteUserRequest {
  id: string
}

class UserService {
  async findAll() {
    const user = await prismaClient.user.findMany()

    return user
  }
  async findById({ id }: FindUserByIdRequest) {
    const user = await prismaClient.user.findMany({
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
    userTypesId,
  }: CreateUserRequest) {
    if (!fullname || !email || !password || !phoneNumber || !userTypesId) {
      throw new Error('Preencha todos os campos')
    }

    const alreadyExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    })

    if (alreadyExists) {
      throw new Error('Usuário já existe')
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        fullname,
        email,
        password: passwordHash,
        phoneNumber,
        userTypesId,
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        phoneNumber: true,
        userTypesId: true,
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
    userTypesId,
  }: UpdateUserRequest) {
    if (!fullname || !email || !password || !phoneNumber || !userTypesId) {
      throw new Error('Preencha todos os campos')
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        fullname,
        email,
        password: passwordHash,
        phoneNumber,
        userTypesId,
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        phoneNumber: true,
        userTypesId: true,
      },
    })

    if (!user) {
      throw new Error('Erro ao atualizar usuário')
    }

    return user
  }

  async delete({ id }: DeleteUserRequest) {
    const deleteUserType = await prismaClient.user.delete({
      where: {
        id,
      },
    })

    if (!deleteUserType) {
      throw new Error('Não foi possível excluir o usuário')
    }

    return deleteUserType
  }

  async authenticate({ email, password }: AuthUserRequest) {
    const user = await prismaClient.user.findFirst({
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

    const token = jwt.sign({
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      userTypesId: user.userTypesId,
    })

    return {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      userTypesId: user.userTypesId,
      token,
    }
  }
}

export default new UserService()
