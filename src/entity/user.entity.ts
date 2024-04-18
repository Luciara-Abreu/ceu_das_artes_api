import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Location } from './location.entity';
import { Devolution } from './devolution.entity';
import { Course } from './course.entity';
import { Role } from '../helpers/enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ default: Role.User })
  role: number;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Location, (location) => location.user)
  locations: Location[];

  @OneToMany(() => Devolution, (devolution) => devolution.user)
  devolutions: Devolution[];

  // @OneToMany(() => Course, (course) => course.user)
  // courses: Course[];
}
