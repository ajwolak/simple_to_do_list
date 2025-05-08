type TodoItemProps = {
  task: { id: string; name: string };
  index: number;
 onDelete?: (id: string) => void;
};

export default TodoItemProps;