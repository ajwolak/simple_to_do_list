import React from "react";
import AddTaskFormProps from "./add-task-form-props";
import LoadingSpinner from "../loading-spinner/loading-spinner.tsx";

const AddTaskForm = ({
  newTaskName,
  setNewTaskName,
  saving,
  onSave,
  onCancel,
}: AddTaskFormProps) => (
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
      onClick={saving ? () => {} : onSave}
    >
      {saving ? <LoadingSpinner /> : "Zapisz"}
    </button>
    <button className="btn btn-outline-secondary" onClick={onCancel}>
      Anuluj
    </button>
  </div>
);

export default AddTaskForm;
