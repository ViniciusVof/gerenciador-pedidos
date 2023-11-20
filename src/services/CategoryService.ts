import prismaClient from '../lib/prisma'

interface CreateCategoryRequest {
  name: string
  restaurantId: string
}

interface UpdateCategoryRequest {
  id: string
  name: string
  restaurantId: string
}

interface FindCategoryByIdRequest {
  id: string
}

interface DeleteCategoryRequest {
  id: string
}

class CategoryService {
  async findAll() {
    const category = await prismaClient.category.findMany()

    return category
  }
  async findById({ id }: FindCategoryByIdRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }

    const category = await prismaClient.category.findMany({
      where: {
        id,
      },
    })

    if (!category) {
      throw new Error('Categoria não encontrado')
    }

    return category
  }
  async create({ name, restaurantId }: CreateCategoryRequest) {
    if (!name || !restaurantId) {
      throw new Error('Preencha todos os campos')
    }

    const alreadyExists = await prismaClient.category.findFirst({
      where: {
        AND: [
          {
            name,
          },
          { restaurantId },
        ],
      },
    })

    if (alreadyExists) {
      throw new Error('Categoria já existe')
    }

    const category = await prismaClient.category.create({
      data: {
        name,
        restaurantId,
      },
    })

    if (!category) {
      throw new Error('Erro ao cadastrar categoria')
    }

    return category
  }

  async update({ id, name, restaurantId }: UpdateCategoryRequest) {
    if (!id || !name || !restaurantId) {
      throw new Error('Preencha todos os campos')
    }

    const category = await prismaClient.category.update({
      where: {
        id,
      },
      data: {
        name,
        restaurantId,
      },
      select: {
        id: true,
        name: true,
      },
    })

    if (!category) {
      throw new Error('Erro ao atualizar categoria')
    }

    return category
  }

  async delete({ id }: DeleteCategoryRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }
    const deleteCategory = await prismaClient.category.delete({
      where: {
        id,
      },
    })

    if (!deleteCategory) {
      throw new Error('Não foi possível excluir a categoria')
    }

    return deleteCategory
  }
}

export default new CategoryService()
