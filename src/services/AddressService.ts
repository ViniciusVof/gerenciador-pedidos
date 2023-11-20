import prismaClient from '../lib/prisma'

interface CreateAddressRequest {
  address: string
  addressNumber: number
  addressComplement: string
  neighborhoodId: string
  customerId: string
}

interface UpdateAddressRequest {
  id: string
  address: string
  addressNumber: number
  addressComplement: string
  neighborhoodId: string
  customerId: string
}

interface FindAddressByIdRequest {
  id: string
}

interface DeleteAddressRequest {
  id: string
}

class AddressService {
  async findAll() {
    const address = await prismaClient.address.findMany()

    return address
  }
  async findById({ id }: FindAddressByIdRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }

    const address = await prismaClient.address.findMany({
      where: {
        id,
      },
    })

    if (!address) {
      throw new Error('Endereço não encontrado')
    }

    return address
  }
  async create({
    address,
    addressNumber,
    addressComplement,
    neighborhoodId,
    customerId,
  }: CreateAddressRequest) {
    if (!address || !addressNumber || !neighborhoodId || !customerId) {
      throw new Error('Preencha todos os campos')
    }

    const alreadyExists = await prismaClient.address.findFirst({
      where: {
        AND: [
          {
            address,
          },
          { addressNumber },
          { customerId },
        ],
      },
    })

    if (alreadyExists) {
      throw new Error('Endereço já existe')
    }

    const addressCreate = await prismaClient.address.create({
      data: {
        address,
        addressNumber,
        addressComplement,
        neighborhoodId,
        customerId,
      },
    })

    if (!addressCreate) {
      throw new Error('Erro ao cadastrar endereço')
    }

    return addressCreate
  }
  async update({
    id,
    address,
    addressNumber,
    addressComplement,
    neighborhoodId,
    customerId,
  }: UpdateAddressRequest) {
    if (!id || !address || !addressNumber || !neighborhoodId || !customerId) {
      throw new Error('Preencha todos os campos')
    }

    const addressUpdate = await prismaClient.address.update({
      where: {
        id,
      },
      data: {
        address,
        addressNumber,
        addressComplement,
        neighborhoodId,
        customerId,
      },
      select: {
        id: true,
        address: true,
        addressNumber: true,
        addressComplement: true,
        neighborhoodId: true,
        customerId: true,
      },
    })

    if (!addressUpdate) {
      throw new Error('Erro ao atualizar endereço')
    }

    return addressUpdate
  }
  async delete({ id }: DeleteAddressRequest) {
    if (!id) {
      throw new Error('Preencha todos os campos')
    }
    const deleteAddress = await prismaClient.address.delete({
      where: {
        id,
      },
    })

    if (!deleteAddress) {
      throw new Error('Não foi possível excluir o endereço')
    }

    return deleteAddress
  }
}

export default new AddressService()
