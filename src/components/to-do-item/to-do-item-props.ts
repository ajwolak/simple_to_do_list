import React from "react";

type TodoItemProps = {
  task: { id: string; name: string; positionOnList: number };
  index: number;
  key?: string | number;
  onDelete: (
    id: string,
    setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
};

export default TodoItemProps;
