'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface Task {
  _id: string
  title: string
  description?: string
  status: string
  priority: string
  dueDate: string
}

export default function TaskDetails() {
  const [task, setTask] = useState<Task | null>(null)
  const router = useRouter()
  const { id } = useParams() // Extract the task id from the URL

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/v1/task/${id}`)
        .then(response => setTask(response.data.data))
        .catch(error => console.error('Error fetching task:', error))
    }
  }, [id])
  console.log(task)
  if (!task) {
    return <p>Loading...</p>
  }

  return (
    <div className="p-6 w-1/2 mx-auto bg-blue-100 rounded-md mt-20 text-lg">
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p className="mt-2">
        Description: {task.description || 'No description available'}
      </p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
      <div className="flex justify-between mt-5">
        <button
          onClick={() => router.push(`/tasks/edit/${id}`)}
          className=" bg-yellow-400 text-black p-2 font-semibold rounded"
        >
          Edit Task
        </button>

        <Link
          className="bg-white p-2 rounded font-semibold text-blue-600"
          href="/tasks"
        >
          Back To Home
        </Link>
      </div>
    </div>
  )
}
