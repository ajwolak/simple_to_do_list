import React, { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import ToDoItem from "../../components/to-do-item/to-do-item.tsx";
import { useAlert } from "../../context/alert-context";
import validateName from "../../hooks/validate-name.js";

const initialTasks = [
  { id: "1", name: "Zadanie 1" },
  { id: "2", name: "Zadanie 2" },
  { id: "3", name: "Zadanie 3" },
];

const Home = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const { showAlert } = useAlert();

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [movedTask] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, movedTask);

    setTasks(newTasks);
  };

  const handleSaveNewTask = () => {
    if (validateName(newTaskName, showAlert)) {
      const newTask = {
        id: Date.now().toString(),
        name: newTaskName,
      };

      setTasks([newTask, ...tasks]);
      setNewTaskName("");
      setIsAdding(false);
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <div className="card shadow">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">
              Lista zadań ({tasks.length})
            </h3>

            {!isAdding ? (
              <button
                className="btn btn-primary w-100 mb-3"
                onClick={() => {
                  if (tasks.length >= 10) {
                    showAlert("Maksymalna liczba zadań to 10", "danger");
                    return;
                  }
                  setIsAdding(true);
                }}
              >
                Dodaj zadanie
              </button>
            ) : (
              <div className="mb-3 d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  placeholder="Nowe zadanie..."
                />
                <button
                  className="btn btn-outline-success me-2"
                  onClick={handleSaveNewTask}
                >
                  Zapisz
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setIsAdding(false);
                    setNewTaskName("");
                  }}
                >
                  Anuluj
                </button>
              </div>
            )}

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="todo-list">
                {(provided) => (
                  <ul
                    className="list-group"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tasks.map((task, index) => (
                      <ToDoItem
                        key={task.id}
                        task={task}
                        index={index}
                        onDelete={(id) =>
                          setTasks((prev) => prev.filter((t) => t.id !== id))
                        }
                      />
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
