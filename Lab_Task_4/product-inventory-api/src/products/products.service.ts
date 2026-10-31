import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Products } from './entities/products.entity.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PartialUpdateProductDto } from './dto/Partial-update-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
  ) {}

  async create(dto: CreateProductDto) {
    const product = this.productsRepo.create(dto);
    return await this.productsRepo.save(product);
  }

  async findAll() {
    return await this.productsRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async search(keyword: string) {
    return await this.productsRepo.find({
      where: { name: ILike(`%${keyword}%`) },
      order: { createdAt: 'DESC' },
    });
  }

  async findByCategory(cat: string) {
    return await this.productsRepo.find({
      where: { category: cat },
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: number, dto: PartialUpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    return await this.productsRepo.save(product);
  }

  async replace(id: number, dto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    return await this.productsRepo.save(product);
  }

  async toggle(id: number) {
    const product = await this.findOne(id);
    product.isActive = !product.isActive;
    return await this.productsRepo.save(product);
  }

  async toggleActive(id: number) {
    return this.toggle(id);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productsRepo.remove(product);
    return {
      message: `Product with id ${id} deleted successfully`,
      id,
    };
  }
}
