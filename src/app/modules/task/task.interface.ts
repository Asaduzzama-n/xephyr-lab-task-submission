import { Model } from 'mongoose'

export type ITask = {
  _id: string
  title: string
  image?: string
  description?: string
  status?: string
  priority: string
  dueDate: string
  assignedTo?: string
  createdAt: Date
  updatedAt: Date
}

export type TaskModel = Model<ITask>

export type ITaskFilter = {
  searchTerm?: string
  title?: string
  status?: string
  priority?: string
  dueDate?: Date
}
