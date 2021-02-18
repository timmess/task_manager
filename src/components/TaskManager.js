import "../styles/TaskManager.scss"
import React from "react"
import { useState, useEffect } from "react"
import StatusLine from "./StatusLine"
import {Link} from "react-router-dom";

export default function TaskManager() {
    const [tasks, setTasks] = useState([])

    /**
     * Ajoute une nouvelle tâche
     *
     * @param status
     */
    function addEmptyTask(status) {
        const lastTask = tasks[tasks.length - 1]

        let newTaskId = 1

        if (lastTask !== undefined) {
            newTaskId = lastTask.id + 1
        }

        setTasks(tasks => [
            ...tasks,
            {
                id: newTaskId,
                title: "",
                description: "",
                status: status,
            },
        ])
    }

    /**
     * Sauvegarde la nouvelle tâche
     *
     * @param taskToAdd
     */
    function addTask(taskToAdd) {
        let filteredTasks = tasks.filter(task => {
            return task.id !== taskToAdd.id
        })

        let newTaskList = [...filteredTasks, taskToAdd]

        setTasks(newTaskList)

        saveTasksToLocalStorage(newTaskList)
    }

    function deleteTask(taskId) {
        let filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })

        setTasks(filteredTasks)

        saveTasksToLocalStorage(filteredTasks)
    }

    function moveTask(id, newStatus) {
        let task = tasks.filter(task => {
            return task.id === id
        })[0]

        let filteredTasks = tasks.filter(task => {
            return task.id !== id
        })

        task.status = newStatus

        let newTaskList = [...filteredTasks, task]

        setTasks(newTaskList)

        saveTasksToLocalStorage(newTaskList)
    }

    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    function loadTasksFromLocalStorage() {
        let loadedTasks = localStorage.getItem("tasks")

        let tasks = JSON.parse(loadedTasks)

        if (tasks) {
            setTasks(tasks)
        }
    }

    useEffect(() => {
        loadTasksFromLocalStorage()
    }, [])

    return (
        <div>
            <h1>Gestionnaire de tâche</h1>
            <main>
                <section>
                    <StatusLine
                        tasks={tasks}
                        addEmptyTask={addEmptyTask}
                        addTask={addTask}
                        deleteTask={deleteTask}
                        moveTask={moveTask}
                        status="A faire"
                    />
                    <StatusLine
                        tasks={tasks}
                        addEmptyTask={addEmptyTask}
                        addTask={addTask}
                        deleteTask={deleteTask}
                        moveTask={moveTask}
                        status="En cours"
                    />
                    <StatusLine
                        tasks={tasks}
                        addEmptyTask={addEmptyTask}
                        addTask={addTask}
                        deleteTask={deleteTask}
                        moveTask={moveTask}
                        status="Terminé"
                    />
                </section>
            </main>
            <Link to="/" className="btn btn-primary w-100 mt-3">Retourner sur son profil</Link>
        </div>
    )
}