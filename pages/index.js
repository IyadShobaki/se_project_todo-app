import { initialTodos, config, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";

const addTodoButton = document.querySelector(config.addTodoButtonSelector);
const addTodoPopup = document.querySelector(config.addTodoPopupSelector);
const addTodoForm = addTodoPopup.querySelector(config.addTodoFormSelector);
const addTodoCloseBtn = addTodoPopup.querySelector(
  config.addTodoCloseBtnSelector
);
const todosList = document.querySelector(config.todosListSelector);

const openModal = (modal) => {
  modal.classList.add(config.modalVisibleClass);
};

const closeModal = (modal) => {
  modal.classList.remove(config.modalVisibleClass);
};

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(
    data,
    config.todoTemplateSelector,
    config.todoTemplateSelectors
  );
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const completed = false;
  const id = uuidv4();

  const values = { id, name, completed, date };
  const todo = generateTodo(values);
  todosList.append(todo);
  closeModal(addTodoPopup);
});

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});
