import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: 'Получение всех товаров',
  })
  @Get()
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: ['asc', 'desc'],
    description: 'asc - по возрастанию, desc - по убыванию',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Поиск по названию товара',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Фильтрация по категории товара',
  })
  async getAllProducts(
    @Query()
    query: {
      sort: 'asc' | 'desc';
      search: string;
      category: string;
      page: number;
      pageSize: number;
    },
  ) {
    const { sort = 'asc', search, category, page = 1, pageSize = 10 } = query;
    return this.productsService.getAllProducts(
      sort,
      page,
      pageSize,
      search,
      category,
    );
  }

  @ApiOperation({
    summary: 'Создание товаров',
  })
  @Post()
  @ApiBody({ type: [CreateProductDto] })
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateProductDto[]) {
    return this.productsService.createProdutc(dto);
  }

  @ApiOperation({
    summary: 'Получение товара по ID',
  })
  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  async getProdutcById(@Param('id') id: number) {
    return this.productsService.getProdutcById(id);
  }

  @ApiOperation({
    summary: 'Получение товара по категории',
  })
  @Get('category/:category')
  @ApiParam({ name: 'category', type: String })
  async getProdutcByCategory(@Param('category') category: string) {
    return this.productsService.getProdutcByCategory(category);
  }
}
