import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAlert } from "../../context/alert-context";
import useToDoItem from "../../hooks/useToDoItem.ts";
import validateName from "../../hooks/validate-name.ts";
import AddTaskForm from "../../components/add-task-form/add-task-form.tsx";
import EmptyListInfo from "../../components/empty-list-info/empty-list-info.tsx";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.tsx";
import ToDoItem from "../../components/to-do-item/to-do-item.tsx";

const Home = () => {
  const {
    tasks,
    addItem,
    loading,
    saving,
    fetchItems,
    deleteItem,
    updateItem,
  } = useToDoItem(process.env.REACT_APP_API_URL);
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const { showAlert } = useAlert();

  const dragEnd = async (result: any) => {
    if (!result.destination) return;

    const fromIndex = result.source.index;
    const toIndex = result.destination.index;
    if (fromIndex === toIndex) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(fromIndex, 1);

    if (!movedTask) {
      return;
    }

    updatedTasks.splice(toIndex, 0, movedTask);

    const patchedTasks = updatedTasks.map((task, index) => {
      if (!task || typeof task !== "object") {
        throw new Error("Nieprawidłowy element w liście zadań");
      }

      return {
        ...task,
        positionOnList: index + 1,
      };
    });
    await updateItem(patchedTasks, tasks);
  };

  const handleSaveNewTask = async () => {
    if (validateName(newTaskName, showAlert)) {
      await addItem(newTaskName);
      setNewTaskName("");
      setIsAdding(false);
    }
  };

  const handleAddClick = () => {
    if (tasks.length >= 10) {
      showAlert("Maksymalna liczba zadań to 10", "danger");
      return;
    }
    setIsAdding(true);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <div className="card shadow">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">
              Lista zadań ({tasks.length})
            </h3>

            {loading ? (
              <LoadingSpinner />
            ) : tasks.length === 0 ? (
              <>
                {!isAdding && <EmptyListInfo onAddClick={handleAddClick} />}
                {isAdding && (
                  <AddTaskForm
                    newTaskName={newTaskName}
                    setNewTaskName={setNewTaskName}
                    saving={saving}
                    onSave={handleSaveNewTask}
                    onCancel={() => {
                      setIsAdding(false);
                      setNewTaskName("");
                    }}
                  />
                )}
              </>
            ) : (
              <>
                {!isAdding && (
                  <button
                    className="btn btn-primary w-100 mb-3"
                    onClick={handleAddClick}
                  >
                    Dodaj zadanie
                  </button>
                )}
                {isAdding && (
                  <AddTaskForm
                    newTaskName={newTaskName}
                    setNewTaskName={setNewTaskName}
                    saving={saving}
                    onSave={handleSaveNewTask}
                    onCancel={() => {
                      setIsAdding(false);
                      setNewTaskName("");
                    }}
                  />
                )}

                <DragDropContext onDragEnd={dragEnd}>
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
                            onDelete={deleteItem}
                          />
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
