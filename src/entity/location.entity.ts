// eslint-disable-next-line prettier/prettier
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Location')
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
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
}
