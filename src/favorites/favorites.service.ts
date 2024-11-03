import { Injectable, NotFoundException } from '@nestjs/common';
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

  async addToFavorites(dto: Favorite) {
    const favorite = this.favoriteRepository.create(dto);
    return await this.favoriteRepository.save(favorite);
  }

  async removeFromFavorites(productId: number) {
    const result = await this.favoriteRepository.delete(productId);

    if (result.affected === 0) {
      throw new NotFoundException(`Продукт с ID ${productId} не найден`);
    }

    return { message: 'Продукт успешно удален из избранного' };
  }
}
