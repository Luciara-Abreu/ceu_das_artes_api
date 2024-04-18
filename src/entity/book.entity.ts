import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Location } from './location.entity';
import { Devolution } from './devolution.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  yearPublication?: Date;

  @Column()
  genre: string;

  @Column()
  cover: string;

  @Column()
  quantityPages: number;

  @Column()
  quantityBook: number;

  @Column()
  booksInStock: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Location, (location) => location.book)
  locations: Location[];

  @OneToMany(() => Devolution, (devolution) => devolution.book)
  devolutions: Devolution[];
}
