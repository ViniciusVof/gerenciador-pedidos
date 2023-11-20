import { Request, Response } from 'express'

import AddressService from '../services/AddressService'

class AddressController {
  async CreateAddress(req: Request, res: Response) {
    const {
      address,
      addressNumber,
      addressComplement,
      neighborhoodId,
      customerId,
    } = req.body

    const addressResponse = await AddressService.create({
      address,
      addressNumber,
      addressComplement,
      neighborhoodId,
      customerId,
    })

    return res.json(addressResponse)
  }
  async UpdateAddress(req: Request, res: Response) {
    const { id } = req.params
    const {
      address,
      addressNumber,
      addressComplement,
      neighborhoodId,
      customerId,
    } = req.body

    const addressResponse = await AddressService.update({
      id,
      address,
      addressNumber,
      addressComplement,
      neighborhoodId,
      customerId,
    })

    return res.json(address)
  }
  async DeleteAddress(req: Request, res: Response) {
    const { id } = req.params

    const addressResponse = await AddressService.delete({ id })

    return res.json(addressResponse)
  }
  async ReadAddress(req: Request, res: Response) {
    const addressResponse = await AddressService.findAll()

    return res.json(addressResponse)
  }
}

export default new AddressController()
