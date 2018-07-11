import { JsonController, Get, Post, Put, Param, Body, BodyParam, NotFoundError, Delete } from 'routing-controllers'
import { Student } from './entity'
import { Batch } from '../batches/entity'
import { Evaluation } from '../evaluations/entity';


@JsonController()
export default class StudentController {

  @Get('/students')
  async allStudents(){
    const students = await Student.find()
    if (!students) throw new NotFoundError('Sorry but that Table does not exist')
    return {students}
  }

  @Get('/students/:id([0-9]+)')
  getStudents(
    @Param('id') id: number
  ) {
    return Student.findOne(id)
  }

  @Post('/students')
  async createStudent(
    @Body() student: Student,
    @BodyParam('batchId', {required: true}) batchId: string
  ) {
    const papa = await Batch.findOne(batchId)
    if(papa instanceof Batch) student.batch = papa
    const entity = await student.save()
    const batch = await Batch.findOne(papa!.id)
    return { entity, batch }
  }

  
  
@Put('/students/:id')
async updateStudent(
  @Param('id') id: number,
  @Body() update: Partial<Student>
) {
  const student = await Student.findOne(id)
  if (!student) throw new NotFoundError('Cannot find student')

  return Student.merge(student, update).save()
}

  @Delete('/students/:id([0-9]+)')
  async deleteStudent(
    @Param('id') studentId: number
  ) {
    const student = await Student.findOne(studentId)
    if (!student) throw new NotFoundError('Sorry but that Student does not exist')
    
      const evaluations = await Evaluation.find({where: {student: student}})
      const papa = await Batch.findOne({where: {student: student}})
      if (!evaluations) throw new NotFoundError('Sorry but that Student does not exist')
      await Evaluation.remove(evaluations)
      await Student.remove(student)
      const batch = await Batch.findOne(papa!.id)
    
    return {batch}
  }

}