/** @format */
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'


function App() {
	const [ showAddTask, setShowAddTask ] = useState(false)
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks()
			setTasks(tasksFromServer)
		}

		getTasks()
	}, [])
	
	// Fetch tasks
	const fetchTasks = async () => {
		const res = await fetch('http://localhost:5030/tasks')
		const data = await res.json()

		return data
	}

	// Fetch task
	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:5030/tasks/${id}`)
		const data = await res.json()

		return data
	}

	// Add Task
	const addTask = async (task) => {
		// const id = Math.floor(Math.random() * 10000) + 1
		// const newTask = { id, ...task}

		// setTasks([ ...tasks, newTask ])
		// console.log(tasks)

		// The same as above!
		const res = await fetch('http://localhost:5030/tasks', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(task)
		})

		const data = await res.json()

		setTasks([...tasks, data])
	}

	// Delete Task
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5030/tasks/${id}`, {
			method: 'DELETE'
		})
		setTasks(tasks.filter(task => task.id !== id))
	}

	// Toggler Reminder
	const toggleReminder = async (id) => {
		const taskToggle = await fetchTask(id)
		const updatedTask = {...taskToggle, reminder: !taskToggle.reminder}

		const res = await fetch(`http://localhost:5030/tasks/${id}`, {
			method: 'PUT',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(updatedTask)
		})

		const data = await res.json()

		setTasks(tasks.map(task => 
			task.id === id ? {...task, reminder:
			data.reminder } : task)
		)
	}

	return (
		<div className="container">
			<Header 
				onAdd={() => setShowAddTask(!showAddTask)} 
				showAdd={showAddTask}
			/>
			{showAddTask && <AddTask onAdd={addTask} />}
			
			{tasks.length > 0 ? 
				<Tasks 
					tasks={tasks} 
					onDelete={deleteTask} 
					onToggle={toggleReminder} />
				: 'No tasks to show'
			}
			
		</div>
	);
}

export default App;
