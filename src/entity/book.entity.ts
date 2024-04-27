import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Location } from './location.entity';
import { Devolution } from './devolution.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  author: string;

  @Column({ type: 'date' })
  yearPublication?: Date;

  @Column({ type: 'varchar' })
  genre: string;

  @Column({ type: 'varchar' })
  cover: string;

  @Column({ type: 'int' })
  quantityPages: number;

  @Column({ type: 'int' })
  quantityBook: number;

  @Column({ type: 'int' })
  booksInStock: number;

  @CreateDateColumn({ type: 'date' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date;

  @OneToMany(() => Location, (location) => location.book)
  locations: Location[];

  @OneToMany(() => Devolution, (devolution) => devolution.book)
  devolutions: Devolution[];
}
