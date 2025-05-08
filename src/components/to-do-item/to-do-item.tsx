import React, { useState } from "react";
import TodoItemProps from "./to-do-item-props";
import { Draggable } from "@hello-pangea/dnd";
import { useAlert } from "../../context/alert-context";
import validateName from "../../hooks/validate-name";

const ToDoItem = ({ task, index, onDelete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(task.name);
  const [currentName, setCurrentName] = useState(task.name);
  const { showAlert } = useAlert();

  const handleSave = () => {
    if (validateName(editedValue, showAlert)) {
      setCurrentName(editedValue);
      setIsEditing(false);
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span className="flex-grow-1 me-3">
            {isEditing ? (
              <input
                type="text"
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
                className="form-control"
              />
            ) : (
              currentName
            )}
          </span>
          <div>
            {isEditing ? (
              <button
                className="btn btn-sm btn-outline-success me-2"
                onClick={handleSave}
              >
                Zapisz
              </button>
            ) : (
              <button
                className="btn btn-sm btn-outline-secondary me-2"
                onClick={() => setIsEditing(true)}
              >
                Edytuj
              </button>
            )}
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => {
                onDelete(task.id);
              }}
            >
              Usuń
            </button>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ToDoItem;
