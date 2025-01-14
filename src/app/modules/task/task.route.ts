import express, { NextFunction, Request, Response } from 'express'
import { TaskController } from './task.controller'
import validateRequest from '../../middlewares/validateRequest'
import { TaskValidations } from './task.validation'
import fileUploadHandler from '../../middlewares/fileUploadHandler'

const router = express.Router()

router.post(
  '/',
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = TaskValidations.createTaskZodSchema.parse(
        JSON.parse(req.body.data)
      )
    }

    return TaskController.createTask(req, res, next)
  }
)

router.patch(
  '/:id',
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = TaskValidations.updateTaskZodSchema.parse(
        JSON.parse(req.body.data)
      )
    }

    return TaskController.updateTask(req, res, next)
  }
)

router.delete('/:id', TaskController.deleteTask)

router.get('/:id', TaskController.getSingleTask)

router.get('/', TaskController.getAllTasks)

export const TaskRoutes = router
