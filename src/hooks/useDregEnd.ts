import useToDoItem from "./useToDoItem.ts";

const useDragEnd = (tasks) => {
  const { updateItem } = useToDoItem(process.env.REACT_APP_API_URL);

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
    console.log("dragEnd", tasks, patchedTasks);

    await updateItem(patchedTasks, tasks);
  };

  return { dragEnd };
};

export default useDragEnd;
