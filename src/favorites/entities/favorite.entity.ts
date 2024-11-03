import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('decimal')
  price: number;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  image: string;

  @Column('json')
  rating: {
    rate: number;
    count: number;
  };
}
