import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'string' })
  bookId: string;

  @Column({ type: 'string' })
  userId: string;

  @Column({ type: 'date' })
  takeOnDate: Date;

  @Column({ type: 'date' })
  devolutionDate: Date;

  @Column({ type: 'varchar' })
  status: string;

  @CreateDateColumn({ type: 'date' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date;

  @ManyToOne(() => Book, (book) => book.locations)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @ManyToOne(() => User, (user) => user.locations)
  @JoinColumn({ name: 'userId' })
  user: User;
}
