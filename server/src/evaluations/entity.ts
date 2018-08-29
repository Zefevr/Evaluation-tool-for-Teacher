import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsDate } from 'class-validator'
import { Type } from 'class-transformer';
import { Student } from '../students/entity'
import  Teacher  from '../teachers/entity'


@Entity()
export class Evaluation extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable: true})
  remark: string

  @IsString()
  @Column('text')
  color: string

  @IsDate()
  @Column('date')
  @Type(() => Date)
  scoreDate: Date

  @ManyToOne(_ => Student, student => student.evaluations)
  student: Student

  @ManyToOne(_ => Teacher, teacher => teacher.evaluations, {eager: true})
  teacher: Teacher
}