import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsDecimal } from 'class-validator';

export class Rating {
  @ApiProperty({
    description: 'Рейтинг товара',
  })
  @IsDecimal({ decimal_digits: '0,2' })
  rate: number;

  @ApiProperty({
    description: 'Количество оценок',
  })
  @IsDecimal()
  count: number;
}
export class CreateProductDto {
  @ApiProperty({
    description: 'Название товара',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Цена товара',
  })
  @IsDecimal({ decimal_digits: '0,2' })
  price: number;

  @ApiProperty({
    description: 'Описание товара',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Категория товара',
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Фото товара',
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Рейтинг товара',
    type: Rating,
  })
  @Type(() => Rating)
  rating: Rating;
}
