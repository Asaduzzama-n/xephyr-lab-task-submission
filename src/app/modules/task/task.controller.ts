import { Request, Response, NextFunction } from 'express'
import { TaskServices } from './task.service'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ITask } from './task.interface'
import pick from '../../../shared/pick'
import { taskFilterableFields } from './task.constants'
import { paginationFields } from '../../../helpers/pagination'

const createTask = catchAsync(async (req: Request, res: Response) => {
  if (req.files && 'image' in req.files && req.files.image[0])
    req.body.image = `/images/${req.files.image[0].filename}`

  const task = await TaskServices.createTask(req.body)
  sendResponse<ITask>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Task created successfully',
    data: task,
  })
})

const updateTask = catchAsync(async (req: Request, res: Response) => {
  if (req.files && 'image' in req.files && req.files.image[0])
    req.body.image = `/images/${req.files.image[0].filename}`
  const task = await TaskServices.updateTask(req.params.id, req.body)
  sendResponse<ITask>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Task updated successfully',
    data: task,
  })
})

const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const task = await TaskServices.deleteTask(req.params.id)
  sendResponse<ITask>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Task deleted successfully',
    data: task,
  })
})
const getSingleTask = catchAsync(async (req: Request, res: Response) => {
  const task = await TaskServices.getSingleTask(req.params.id)
  sendResponse<ITask>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Task retrieved successfully',
    data: task,
  })
})

const getAllTasks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, taskFilterableFields)
  const pagination = pick(req.query, paginationFields)
  const tasks = await TaskServices.getAllTasks(filters, pagination)
  sendResponse<ITask[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tasks retrieved successfully',
    meta: tasks.meta,
    data: tasks.data,
  })
})
export const TaskController = {
  createTask,
  updateTask,
  deleteTask,
  getSingleTask,
  getAllTasks,
}
