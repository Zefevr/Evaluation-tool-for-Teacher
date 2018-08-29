import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsEmail, IsString} from 'class-validator'
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcrypt'
import { Evaluation } from '../evaluations/entity';

@Entity()
export default class Teacher extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsEmail()
  @Column('text')
  email: string

  @IsString()
  @Column('text')
  @Exclude({ toPlainOnly: true })
  password: string

  @OneToMany(_ => Evaluation, evaluation => evaluation.teacher)
  evaluations: Evaluation[]

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
    }
  
    checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
    }

  }
  
 

    // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
 // @OneToMany(_ => Player, player => player.user) 
  //players: Player[]