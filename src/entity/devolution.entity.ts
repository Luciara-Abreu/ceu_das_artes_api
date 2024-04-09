// eslint-disable-next-line prettier/prettier
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity('devolution')
export class Devolution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bookId: string;

  @Column()
  userId: string;

  @Column()
  effectiveDevolution: Date;

  @Column()
  conditionDelivery: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Book, (book) => book.devolution) // Muitas devoluções podem ter um único livro
  @JoinColumn({ name: 'bookId' }) // Nome da coluna na tabela de Locação que armazena a chave estrangeira
  book: Book;

  @ManyToOne(() => User, (user) => user.devolution) // Muitas devoluções podem ter um único usuário
  @JoinColumn({ name: 'userId' }) // Nome da coluna na tabela de Locação que armazena a chave estrangeira
  user: User;
}
