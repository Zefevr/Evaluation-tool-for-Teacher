import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'
import TeacherController from './teachers/controller'
import BatchController from './batches/controller'
import StudentController from './students/controller'
import EvaluationController from './evaluations/controller'
import LoginController from './logins/controller'

const port = process.env.PORT || 4000

const app = createKoaServer({
  cors: true,
  controllers: [
      TeacherController,
      BatchController,
      StudentController,
      EvaluationController,
      LoginController
    ]
})

setupDb()
  .then(_ => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
  })
  .catch(err => console.error(err))