// eslint-disable-next-line prettier/prettier
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Location } from './location.entity';
import { Devolution } from './devolution.entity';
import { Role } from '../helpers/enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  fone: string;

  @Column({
    default: Role.User,
  })
  role: number;

  @Column()
  password?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  //relacionamento
  @OneToMany(() => Location, (location) => location.user)
  locations: Location[];

  @OneToMany(() => Devolution, (devolution) => devolution.user)
  devolution: Devolution[];
}
