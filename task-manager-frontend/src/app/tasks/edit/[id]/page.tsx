'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EditTask() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'low',
    dueDate: '',
  })
  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/v1/task/${id}`)
        .then(response => {
          setFormData({
            title: response.data.data.title || '', // Ensure default value
            description: response.data.data.description || '', // Ensure default value
            status: response.data.data.status || 'pending', // Ensure default value
            priority: response.data.data.priority || 'low', // Ensure default value
            dueDate: response.data.data.dueDate
              ? new Date(response.data.data.dueDate).toISOString().split('T')[0] // Format date for input
              : '', // Ensure default value
          })
        })
        .catch(error => console.error('Error fetching task:', error))
    }
  }, [id])

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
      .patch(`http://localhost:5000/api/v1/task/${id}`, formData)
      .then(() => router.push(`/tasks/task/${id}`))
      .catch(error => console.error('Error updating task:', error))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6  shadow rounded-md space-y-4 w-1/2 mx-auto mt-20 bg-blue-100"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Task</h1>
        <Link
          className="bg-white p-2 rounded-md font-semibold"
          href={'/tasks/'}
        >
          Back to home
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
        placeholder="Description"
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
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Save Changes
      </button>
    </form>
  )
}
