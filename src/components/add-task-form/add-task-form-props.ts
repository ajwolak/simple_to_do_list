type AddTaskFormProps = {
  newTaskName: string;
 setNewTaskName: (value: string) => void;
  saving: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export default AddTaskFormProps;