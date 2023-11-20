import { Request, Response } from 'express'
import ProductService from '../services/ProductService'

class ProductController {
  async CreateProduct(req: Request, res: Response) {
    const { name, description, price, categoryId } = req.body

    if (!req.file) {
      throw new Error('Erro ao fazer upload da imagem')
    }

    const { filename: photo } = req.file

    const product = await ProductService.create({
      name,
      description,
      price,
      photo,
      categoryId,
    })

    return res.json(product)
  }
  async UpdateProduct(req: Request, res: Response) {
    const { id } = req.params
    const { name, description, price, categoryId } = req.body

    if (!req.file) {
      throw new Error('Erro ao fazer upload da imagem')
    }

    const { filename: photo } = req.file

    const product = await ProductService.update({
      id,
      name,
      description,
      price,
      photo,
      categoryId,
    })

    return res.json(product)
  }
  async DeleteProduct(req: Request, res: Response) {
    const { id } = req.params

    const product = await ProductService.delete({ id })

    return res.json(product)
  }
  async ReadProduct(req: Request, res: Response) {
    const product = await ProductService.findAll()

    return res.json(product)
  }
}

export default new ProductController()
