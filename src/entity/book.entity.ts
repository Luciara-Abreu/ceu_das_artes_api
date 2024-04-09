// eslint-disable-next-line prettier/prettier
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
}