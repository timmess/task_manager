import React from "react"
import { useState } from "react"
import "../styles/task.scss"
import Timer from "react-compound-timer";

export default function Task(props) {
    const { addTask, deleteTask, moveTask, task } = props

    const [time, setTime] = useState(0)
    const [collapsed, setCollapsed] = useState(task.isCollapsed)
    const [formAction, setFormAction] = useState("")

    /**
     * Traitement du formulaire d'ajout et de suppresion d'une tâche
     *
     * @param event
     */
    function handleSubmit(event) {
        event.preventDefault()

        if (formAction === "save") {
            if (collapsed) {
                setCollapsed(false)
            }else {
                let newTask = {
                    id: task.id,
                    title: event.target.elements.title.value,
                    time: event.target.elements.time.value,
                    description: event.target.elements.description.value,
                    status: task.status,
                    isCollapsed: true,
                }

                addTask(newTask)
                setCollapsed(true)
            }
        }

        if (formAction === "delete") {
            deleteTask(task.id)
        }
    }

    /**
     * Change le statut de la Task vers le statut précédent
     */
    function handleMoveLeft() {
        let newStatus = ""

        if (task.status === "En cours") {
            newStatus = "A faire"
        } else if (task.status === "Terminé") {
            newStatus = "En cours"
        }

        if (newStatus !== "") {
            moveTask(task.id, newStatus)
        }
    }

    /**
     * Change le statut de la Task vers le statut suivant
     */
    function handleMoveRight() {

        let newStatus = ""

        if (task.status === "A faire") {
            newStatus = "En cours"
        } else if (task.status === "En cours") {
            newStatus = "Terminé"
        }

        if (newStatus !== "") {
            moveTask(task.id, newStatus)
        }
    }

    return (
        <div className={`task ${collapsed ? "collapsedTask" : ""}`}>
            <button onClick={handleMoveLeft} className="button moveTask">
                &#171;
            </button>
            <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
                <input
                    type="text"
                    className="title input"
                    name="title"
                    placeholder="Titre"
                    disabled={collapsed}
                    defaultValue={task.title}
                />
                <textarea
                    rows="2"
                    className="description input"
                    name="description"
                    placeholder="Description"
                    defaultValue={task.description}
                />
                {!collapsed ?
                    <div className="input-group mb-3">
                        <input
                            type="number"
                            className="form-control"
                            name="time"
                            placeholder="Durée en minutes"
                            onChange={(e) => {
                                setTime(e.target.value)
                            }}
                        />
                    </div>
                :
                    <>
                        <Timer
                            initialTime={task.time * 100000}
                            direction="backward"
                        >
                            {({ start, pause, reset }) => (
                                <React.Fragment>
                                    <div>
                                        <Timer.Hours /> heures <Timer.Minutes /> minutes <Timer.Seconds /> secondes
                                    </div>
                                </React.Fragment>
                            )}
                        </Timer>
                    </>
                }
                <button
                    onClick={() => {
                        setFormAction("save")
                    }}
                    className="btn btn-success"
                >
                    {collapsed ? "Edit" : "Save"}
                </button>
                {collapsed && (
                    <button
                        onClick={() => {
                            setFormAction("delete")
                        }}
                        className="btn btn-danger"
                    >
                        X
                    </button>
                )}
            </form>
            <button onClick={handleMoveRight} className="button moveTask">
                &#187;
            </button>
        </div>
    )
}