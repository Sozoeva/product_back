import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { FindOptionsOrder, FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts(
    sort: 'asc' | 'desc',
    page: number,
    pageSize: number,
    search: string,
    category: string,
  ) {
    const order: FindOptionsOrder<Product> = {
      price: sort,
    };

    const where: FindOptionsWhere<Product> = {};
    if (search) {
      where.title = Like(`%${search}%`);
    }
    if (category) {
      where.category = category;
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [products, total] = await this.productRepository.findAndCount({
      where,
      order,
      skip,
      take,
    });

    return {
      products,
      total,
      page,
      pageSize,
    };
  }

  async createProdutc(dto: CreateProductDto[]) {
    const newProduct = this.productRepository.create(dto);
    return await this.productRepository.save(newProduct);
  }

  async getProdutcById(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Товар с ID ${id} не найден`);
    }
    return product;
  }

  async getProdutcByCategory(category: string) {
    const products = await this.productRepository.find({
      where: { category },
    });
    if (products.length === 0) {
      throw new NotFoundException(
        `Товаров с категорией ${category} не существует`,
      );
    }
    return products;
  }
}
