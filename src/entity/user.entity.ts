import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Location } from './location.entity';
import { Devolution } from './devolution.entity';
import { Role } from '../helpers/enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ default: Role.User, type: 'int' })
  role: number;

  @Column({ type: 'varchar' })
  password: string;

  @CreateDateColumn({ type: 'date' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date;

  @OneToMany(() => Location, (location) => location.user)
  locations: Location[];

  @OneToMany(() => Devolution, (devolution) => devolution.user)
  devolutions: Devolution[];
}
