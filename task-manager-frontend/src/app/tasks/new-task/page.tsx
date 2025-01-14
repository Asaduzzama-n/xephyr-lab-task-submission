'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewTask() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'low',
    dueDate: '',
  })

  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    axios
      .post('http://localhost:5000/api/v1/task', formData)
      .then(() => router.push('/tasks'))
      .catch(error => console.error('Error creating task:', error))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6  shadow rounded-md space-y-4 w-1/2 mx-auto mt-20 bg-blue-100"
    >
      <div className="flex justify-between items-center ">
        {' '}
        <h1 className="text-2xl font-bold">Create New Task</h1>
        <Link
          className="bg-white p-2 font-semibold text-blue-600"
          href="/tasks"
        >
          Back to Home
        </Link>
      </div>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Description (optional)"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <div className="">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Create Task
        </button>
      </div>
    </form>
  )
}
