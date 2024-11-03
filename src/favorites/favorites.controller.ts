import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiBody, ApiExcludeEndpoint, ApiOperation } from '@nestjs/swagger';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('hidden')
  @ApiExcludeEndpoint()
  async getAllFavorites() {
    return this.favoritesService.getFavorites();
  }

  @ApiOperation({
    summary: 'Создание товаров',
  })
  @Post()
  @ApiBody({ type: CreateFavoriteDto })
  async addToFavorites(@Body() dto: CreateFavoriteDto) {
    const productId = dto.productId;
    return this.favoritesService.addToFavorites(productId);
  }

  @ApiOperation({
    summary: 'Удаление товаров',
  })
  @Delete(':id')
  async removeFromFavorites(@Param('id') productId: number) {
    this.favoritesService.removeFromFavorites(productId);
    return { message: 'Товар удален из избранного' };
  }

  @Get()
  async getFavoritesWithProducts() {
    return this.favoritesService.getFavoritesWithProducts();
  }
}
