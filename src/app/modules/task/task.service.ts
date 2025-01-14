import { StatusCodes } from 'http-status-codes'

import { ITask, ITaskFilter } from './task.interface'
import { Task } from './task.model'
import ApiError from '../../../errors/ApiError'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { taskSearchableFields } from './task.constants'
import { object } from 'zod'
import { IGenericResponse } from '../../../interfaces/common'

const createTask = async (payload: ITask): Promise<ITask> => {
  const result = await Task.create(payload)
  if (!result)
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create task')
  return result
}

const getAllTasks = async (
  filters: ITaskFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITask[]>> => {
  const { searchTerm, ...filterableFields } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)
  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: taskSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filterableFields).length) {
    andCondition.push({
      $and: Object.entries(filterableFields).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {}

  const result = await Task.find(whereCondition)
    .sort({
      [sortBy]: sortOrder,
    })
    .skip(skip)
    .limit(limit)

  const total = await Task.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: result,
  }
}

const getSingleTask = async (id: string): Promise<ITask | null> => {
  const result = await Task.findById(id)
  if (!result)
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Requested task with id ${id} not found`
    )
  return result
}

const updateTask = async (
  id: string,
  payload: Partial<ITask>
): Promise<ITask | null> => {
  const result = await Task.findOneAndUpdate(
    { _id: id },
    { $set: payload },
    {
      new: true,
    }
  )
  if (!result)
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Requested task with id ${id} not found`
    )
  return result
}

const deleteTask = async (id: string): Promise<ITask | null> => {
  const result = await Task.findByIdAndDelete(id)
  if (!result)
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Requested task with id ${id} not found`
    )
  return result
}
export const TaskServices = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
}
