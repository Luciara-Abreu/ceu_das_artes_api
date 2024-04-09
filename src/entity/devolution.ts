// eslint-disable-next-line prettier/prettier
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
}
