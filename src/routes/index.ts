import { TaskRoutes } from '../app/modules/task/task.route'
import express from 'express'

const router = express.Router()

export const apiRoutes: { path: string; route: any }[] = [
  { path: '/task', route: TaskRoutes },
]

apiRoutes.forEach(route => router.use(route.path, route.route))

export default router
