import { Decimal } from '@prisma/client/runtime/library'
import prismaClient from '../lib/prisma'
import { unlink } from 'fs'
import { resolve } from 'path'

interface CreateProductRequest {
  name: string
  description: string
  price: Decimal
  photo: string
  categoryId: string
}

interface UpdateProductRequest {
  id: string
  name: string
  description: string
  price: Decimal
  photo: string
  categoryId: string
}

interface FindProductByIdRequest {
  id: string
}

interface DeleteProductRequest {
  id: string
}

class ProductService {
  async findAll() {
    const product = await prismaClient.product.findMany()

    return product
  }
  async findById({ id }: FindProductByIdRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }
    const product = await prismaClient.product.findMany({
      where: {
        id,
      },
    })

    if (!product) {
      throw new Error('Produto não encontrado')
    }

    return product
  }
  async create({
    name,
    description,
    price,
    photo,
    categoryId,
  }: CreateProductRequest) {
    if (!name || !description || !photo || !categoryId || !price) {
      throw new Error('Preencha todos os campos')
    }

    const alreadyExists = await prismaClient.product.findFirst({
      where: {
        AND: [
          {
            name,
          },
          { categoryId },
        ],
      },
    })

    if (alreadyExists) {
      throw new Error('Produto já existe')
    }

    const product = await prismaClient.product.create({
      data: {
        name,
        description,
        price,
        photo,
        categoryId,
      },
    })

    if (!product) {
      throw new Error('Erro ao cadastrar produto')
    }

    return product
  }

  async update({
    id,
    name,
    description,
    price,
    photo,
    categoryId,
  }: UpdateProductRequest) {
    if (!id || !name || !description || !photo || !categoryId || !price) {
      throw new Error('Preencha todos os campos')
    }

    const oldProduct = await prismaClient.product.findFirst({
      where: { id },
      select: {
        photo: true,
      },
    })

    unlink(
      resolve(__dirname, '..', '..', 'uploads', oldProduct.photo),
      error => {
        if (!error) return true
        if (error) throw new Error('Erro ao excluir arquivo')
      }
    )

    const product = await prismaClient.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        photo,
        categoryId,
      },
      select: {
        id: true,
        name: true,
      },
    })

    if (!product) {
      throw new Error('Erro ao atualizar produto')
    }

    return product
  }

  async delete({ id }: DeleteProductRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }
    const oldProduct = await prismaClient.product.findFirst({
      where: { id },
      select: {
        photo: true,
      },
    })

    unlink(
      resolve(__dirname, '..', '..', 'uploads', oldProduct.photo),
      error => {
        if (!error) return true
        if (error) throw new Error('Erro ao excluir arquivo')
      }
    )

    const deleteProduct = await prismaClient.product.delete({
      where: {
        id,
      },
    })

    if (!deleteProduct) {
      throw new Error('Não foi possível excluir o produto')
    }

    return deleteProduct
  }
}

export default new ProductService()
