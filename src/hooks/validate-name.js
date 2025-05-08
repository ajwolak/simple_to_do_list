const validateName = (name, showAlert) => {
  if (name.trim() === "") {
    showAlert("Nazwa nie może być pusta", "danger");
    return false;
  }

  if (name.length > 150) {
    showAlert("Nazwa nie może być dłuższa niż 150 znaków", "danger");
    return false;
  }

  return true;
};

export default validateName;
