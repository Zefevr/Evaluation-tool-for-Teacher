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
    const batch = await Batch.findOne(batchId)
    if(batch instanceof Batch) student.batch = batch
    const entity = await student.save()
    return { entity }
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
    if(student) {
      const evaluations = await Evaluation.find({student: student})
      evaluations.map(evaluation => evaluation.remove())
      await student.remove()
    }
    return 'The Student and his/her evaluations were removed successfully'
  }

}