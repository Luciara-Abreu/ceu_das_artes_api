import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  bookId: string;

  @Column()
  userId: string;

  @Column()
  takeOnDate: Date;

  @Column()
  devolutionDate: Date;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Book, (book) => book.locations)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @ManyToOne(() => User, (user) => user.locations)
  @JoinColumn({ name: 'userId' })
  user: User;
}
