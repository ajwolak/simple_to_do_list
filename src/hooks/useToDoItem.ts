import { useState } from "react";
import { useAlert } from "./../context/alert-context.jsx";

export default function useToDoItem(apiUrl) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showAlert } = useAlert();

  const fetchItems = async () => {
    try {
      const res = await fetch(`${apiUrl}/to_do_items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        showAlert("Nie udało się pobrać zadań", "danger");
      } else {
        const data = await res.json();
        data.sort((a, b) => a.positionOnList - b.positionOnList);
        setTasks(data);
      }
    } catch {
      showAlert("Nie udało się pobrać zadań", "danger");
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (name) => {
    setSaving(true);
    try {
      const position =
        tasks.length > 0
          ? Math.max(...tasks.map((task) => task.positionOnList)) + 1
          : 1;

      const res = await fetch(`${apiUrl}/to_do_items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, positionOnList: position }),
      });

      if (res.ok) {
        const newTask = await res.json();
        setTasks((prev) => [...prev, newTask]);
      } else {
        showAlert("Nie udało się dodać zadania", "danger");
      }
    } catch {
      showAlert("Nie udało się dodać zadania", "danger");
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id, setIsDeleting) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`${apiUrl}/to_do_items/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setTasks((prev) => prev.filter((t) => t.id !== id));
      } else {
        showAlert("Nie udało się usunąć zadania", "danger");
      }
    } catch {
      showAlert("Nie udało się usunąć zadania", "danger");
    } finally {
      setIsDeleting(false);
    }
  };

  const updateItem = async (updatedTasks, originalTasks) => {
    setTasks(updatedTasks);
    try {
      const response = await fetch(`${apiUrl}/to_do_items/reorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          updatedTasks.map((task) => ({
            id: task.id,
            positionOnList: task.positionOnList,
          }))
        ),
      });

      if (!response.ok) {
        // setTasks(originalTasks);
        throw new Error();
      }
    } catch (err) {
      // setTasks(originalTasks);
      console.error("Błąd podczas aktualizacji miejsc na liście:", err);
      showAlert("Nie udało się zaktualizować listy", "danger");
    }
  };

  return {
    tasks,
    setTasks,
    addItem,
    deleteItem,
    updateItem,
    loading,
    saving,
    fetchItems,
  };
}
