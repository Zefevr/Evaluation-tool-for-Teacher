import { JsonController, Get, Post, Patch, Param, Body, BodyParam, NotFoundError, Delete } from 'routing-controllers'
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
  async getStudentById(
    @Param('id') studentId: number
  ) {
    const studentById = await Student.findOne(studentId)
    if (!studentById) throw new NotFoundError('Sorry but that Student does not exist')
    if (studentById) {
      return {studentById}
    }
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

  
  @Patch('/students/:id([0-9]+)')
  async updateStudent(
    @Param('id') studentId: number,
    @Body() update
  ) {
    let student = await Student.findOne(studentId)
    
    if(student) {
      student.firstName = update.firstName
      student.lastName = update.lastName
      student.profilePicture = update.profilePicture
      await student.save()
    }

    return student
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