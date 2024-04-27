import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity('devolutions')
export class Devolution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'string' })
  bookId: string;

  @Column({ type: 'string' })
  userId: string;

  @Column({ type: 'timestamp' })
  effectiveDevolution: Date;

  @Column({ type: 'varchar' })
  conditionDelivery: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Book, (book) => book.devolutions)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @ManyToOne(() => User, (user) => user.devolutions)
  @JoinColumn({ name: 'userId' })
  user: User;
}
