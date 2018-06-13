import { JsonController, Get, Post, Param, Body, NotFoundError, Authorized } from 'routing-controllers'
import { Teacher } from './entity'

@JsonController()
export default class TeacherController {

  @Authorized()
  @Get('/teachers/:id([0-9]+)')
  async getTeacherById(
    @Param('id') teacherId: number
  ) {
    const teacherById = await Teacher.findOne(teacherId)
    if (!teacherById) throw new NotFoundError('Sorry, this Teacher does not exist')
    if (teacherById) {
      return {teacherById}
    }
  }

  //@Authorized()
  @Post('/teachers')
  async createTeacher(
    @Body() teacher: Teacher
  ) {
    const {password, ...rest} = teacher
    const entity = Teacher.create(rest)
    await entity.setPassword(password)
    return entity.save()
  }
}