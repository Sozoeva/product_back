import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDecimal,
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
} from 'class-validator';

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

export class CreateFavoriteDto {
  @ApiProperty({
    description: 'Название товара',
  })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Категория товара',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Фото товара',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'Рейтинг товара',
    type: Rating,
  })
  @ValidateNested()
  @Type(() => Rating)
  rating: Rating;
}
