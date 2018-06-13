import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'
import { Batch } from '../batches/entity';
import { Evaluation } from '../evaluations/entity';


@Entity()
export class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  firstName: string

  @IsString()
  @Column('text')
  lastName: string

  @IsString()
  @Column('text')
  profilePicture: string

  @ManyToOne(_ => Batch, batch => batch.students)
  batch: Batch

  @OneToMany(_ => Evaluation, evaluation => evaluation.student, {eager: true})
  evaluations: Evaluation[]

}