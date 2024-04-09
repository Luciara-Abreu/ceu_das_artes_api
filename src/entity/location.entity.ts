import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity('Location')
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

  @ManyToOne(() => Book, (book) => book.locations) // Muitas devoluções podem ter um único livro
  @JoinColumn({ name: 'bookId' }) // Nome da coluna na tabela de Locação que armazena a chave estrangeira
  book: Book;

  @ManyToOne(() => User, (user) => user.locations) // Muitas devoluções podem ter um único usuário
  @JoinColumn({ name: 'userId' }) // Nome da coluna na tabela de Locação que armazena a chave estrangeira
  user: User;
}
