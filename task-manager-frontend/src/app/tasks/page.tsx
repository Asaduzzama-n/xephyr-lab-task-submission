'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

interface Task {
  _id: string
  title: string
  description?: string
  status: string
  priority: string
  dueDate: string
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/v1/task')
      .then(response => setTasks(response.data.data))
      .catch(error => console.error('Error fetching tasks:', error))
  }, [])

  const handleDelete = (id: string) => {
    axios
      .delete(`http://localhost:5000/api/v1/task/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.error('Error deleting task:', error))
  }

  return (
    <div className="p-6 w-1/2 mx-auto bg-blue-100 rounded-md mt-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Task Manager</h1>
        <Link
          href="/tasks/new-task"
          className="bg-white p-2 rounded-md font-semibold "
        >
          Create New Task
        </Link>
      </div>
      <ul className="mt-4 space-y-4">
        {tasks &&
          tasks.map(task => (
            <li key={task._id} className="p-4 bg-white shadow t rounded-md">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="my-2">
                {task.description || 'No description provided'}
              </p>
              <p className="">
                Status:{' '}
                <span
                  className={`font-semibold text-${
                    task.status === 'completed'
                      ? 'green-500'
                      : task.status === 'in-progress'
                      ? 'blue-500'
                      : 'yellow-600'
                  }`}
                >
                  {task.status}
                </span>
              </p>
              <p>
                Priority:{' '}
                <span
                  className={`font-semibold text-${
                    task.priority === 'high'
                      ? 'red-400'
                      : task.priority === 'medium'
                      ? 'yellow-400'
                      : 'green-300'
                  }`}
                >
                  {task.priority}
                </span>
              </p>
              <p>
                Due Date:
                <span className="bg-gray-200 rounded-full px-2 mx-1">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </p>
              <div className="mt-2 flex space-x-4">
                <Link
                  href={`/tasks/task/${task._id}`}
                  className="text-blue-600"
                >
                  View
                </Link>
                <Link
                  href={`/tasks/edit/${task._id}`}
                  className="text-yellow-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
