import { Schema, model } from 'mongoose'
import { ITask, TaskModel } from './task.interface'
import { TaskPriority, TaskStatus } from './task.constants'

const taskSchema = new Schema<ITask, TaskModel>(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    status: {
      type: String,
      enum: [TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED],
      required: true,
    },
    priority: {
      type: String,
      enum: [TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH],
      required: true,
    },
    dueDate: { type: String, required: true },
    assignedTo: { type: String },
  },
  {
    timestamps: true,
  }
)

export const Task = model<ITask, TaskModel>('Task', taskSchema)
