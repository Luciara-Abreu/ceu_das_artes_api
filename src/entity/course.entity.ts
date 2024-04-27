import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  periodMorning: string;

  @Column({ type: 'varchar' })
  periodMAfternoon: string;

  @Column({ type: 'varchar' })
  durationClassroom: string;

  @Column({ type: 'varchar' })
  dayOfTheWeek: string;

  @Column({ type: 'varchar' })
  instructorId: string;

  @CreateDateColumn({ type: 'date' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date;

  // @ManyToOne(() => User, (user) => user.courses)
  // @JoinColumn({ name: 'instructorId' })
  // user: User;
}
