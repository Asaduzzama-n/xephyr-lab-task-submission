export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export const taskFilterableFields = [
  'searchTerm',
  'status',
  'priority',
  'dueDate',
]
export const taskSearchableFields = ['title', 'description', 'assignedTo']
