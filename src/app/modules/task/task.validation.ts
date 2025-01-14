import { z } from 'zod'
import { TaskPriority, TaskStatus } from './task.constants'
const createTaskZodSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  description: z.string().optional(),
  status: z.enum(
    [TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED],
    {
      required_error: 'Status is required',
    }
  ),
  priority: z.enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH], {
    required_error: 'Priority is required',
  }),
  dueDate: z.string({
    required_error: 'Due date is required',
  }),
  assignedTo: z.string().optional(),
})

const updateTaskZodSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z
    .enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED])
    .optional(),
  priority: z
    .enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH])
    .optional(),
  dueDate: z.string().optional(),
  assignedTo: z.string().optional(),
})
export const TaskValidations = {
  createTaskZodSchema,
  updateTaskZodSchema,
}
