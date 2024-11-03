import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  async getFavorites() {
    return await this.favoriteRepository.find();
  }

  async addToFavorites(productId: number) {
    const existingFavorite = await this.favoriteRepository.findOne({
      where: { productId },
    });
    if (existingFavorite) {
      throw new Error('Товар уже добавлен в избранное');
    }
    const favorite = new Favorite();
    favorite.productId = productId;
    return await this.favoriteRepository.save(favorite);
  }

  async removeFromFavorites(productId: number) {
    await this.favoriteRepository.delete({ productId });
    return { message: 'Товар удален из избранного' };
  }

  async getFavoritesWithProducts() {
    return await this.favoriteRepository.find({ relations: ['product'] });
  }
}
