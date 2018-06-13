import { IsString } from 'class-validator'
import { JsonController, Post, Body, BadRequestError } from 'routing-controllers'
import { sign } from '../jwt'
import { Teacher } from '../teachers/entity'

class AuthenticatePayload {
  @IsString()
  email: string

  @IsString()
  password: string
}

@JsonController()
export default class LoginController {

  @Post('/logins')
  async authenticate(
    @Body() { email, password }: AuthenticatePayload
  ) {
    const teacher = await Teacher.findOne({ where: { email } })
    if (!teacher || !teacher.id) throw new BadRequestError('A theacher with this email does not exist')

    if (!await teacher.checkPassword(password)) throw new BadRequestError('The password is not correct')

    const jwt = sign({ id: teacher.id })
    return { jwt }
  }
}