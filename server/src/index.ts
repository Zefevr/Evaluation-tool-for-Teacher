import 'reflect-metadata'
//import {createKoaServer} from "routing-controllers"
import { Action, BadRequestError, useKoaServer } from "routing-controllers";
import setupDb from "./db";
import { verify } from "./jwt";
import Teacher from "./teachers/entity";
import * as Koa from "koa";
import LoginController from "./logins/controller";
import TeacherController from './teachers/controller'
import BatchController from './batches/controller'
import StudentController from './students/controller'
import EvaluationController from './evaluations/controller'

const port = process.env.PORT || 4000

const app = new Koa();

useKoaServer(app, {
  cors: true,
  controllers: [
    TeacherController,
    BatchController,
    StudentController,
    EvaluationController,
    LoginController
  ],

  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization;
    if (header && header.startsWith("Bearer ")) {
      const [, token] = header.split(" ");

      try {
        return !!(token && verify(token));
      } catch (e) {
        throw new BadRequestError(e);
      }
    }

    return false;
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization;
    if (header && header.startsWith("Bearer ")) {
      const [, token] = header.split(" ");

      if (token) {
        const { id } = verify(token);
        return Teacher.findOne(id);
      }
    }
    return undefined;
  }
});

setupDb()
  .then(_ => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
  })
  .catch(err => console.error(err))

  