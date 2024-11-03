import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({
    summary: 'Получение всех избранных товаров',
  })
  @Get()
  async getAllFavorites() {
    return this.favoritesService.getFavorites();
  }

  @ApiOperation({
    summary: 'Создание товаров',
  })
  @Post()
  @ApiBody({ type: CreateFavoriteDto })
  async addToFavorites(@Body() product: Favorite) {
    this.favoritesService.addToFavorites(product);
    return { message: 'Товар добавлен в избранное' };
  }

  @ApiOperation({
    summary: 'Удаление товаров',
  })
  @Delete(':id')
  async removeFromFavorites(@Param('id') productId: number) {
    this.favoritesService.removeFromFavorites(productId);
    return { message: 'Товар удален из избранного' };
  }
}
