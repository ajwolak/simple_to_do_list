import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import useToDoItemEditor from "../../hooks/useToDoItemEditor.ts";
import TodoItemProps from "./to-do-item-props.ts";
import LoadingSpinner from "../loading-spinner/loading-spinner.tsx";

const ToDoItem = ({ task, index, onDelete }: TodoItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    isLoading,
    isEditing,
    setIsEditing,
    editedValue,
    setEditedValue,
    currentName,
    updateName,
  } = useToDoItemEditor(task, process.env.REACT_APP_API_URL);

  return (
    <Draggable draggableId={task.positionOnList.toString()} index={index}>
      {(provided) => (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span
            className="flex-grow-1 me-3"
            style={{ wordBreak: "break-word" }}
          >
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
          <div className="d-flex justify-content-between align-items-center">
            {isEditing ? (
              <button
                className="btn btn-sm btn-outline-success me-2"
                onClick={isLoading ? () => {} : () => updateName()}
              >
                {isLoading ? <LoadingSpinner /> : "Zapisz"}
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
              onClick={
                isDeleting ? () => {} : () => onDelete(task.id, setIsDeleting)
              }
            >
              {isDeleting ? <LoadingSpinner /> : "Usuń"}
            </button>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ToDoItem;
