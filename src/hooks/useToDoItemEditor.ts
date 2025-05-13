import { useState } from "react";
import validateName from "./validate-name.ts";
import { useAlert } from "./../context/alert-context.jsx";

export default function useToDoItemEditor(task, apiUrl) {
  const [editedValue, setEditedValue] = useState(task.name);
  const [currentName, setCurrentName] = useState(task.name);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();

  const updateName = async () => {
    if (!validateName(editedValue, showAlert)) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/to_do_items/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/merge-patch+json",
        },
        body: JSON.stringify({
          name: editedValue,
        }),
      });

      if (res.ok) {
        setCurrentName(editedValue);
        setIsEditing(false);
      } else {
        showAlert("Nie udało się zapisać zmian", "danger");
      }
    } catch {
      showAlert("Nie udało się zapisać zmian", "danger");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isEditing,
    setIsEditing,
    editedValue,
    setEditedValue,
    currentName,
    updateName,
  };
}
