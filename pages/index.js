import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import {
  initialTodos,
  todoConfig,
  validationConfig,
} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(todoConfig.addTodoButtonSelector);
const addTodoPopup = document.querySelector(todoConfig.addTodoPopupSelector);
const addTodoForm = addTodoPopup.querySelector(todoConfig.addTodoFormSelector);
const addTodoCloseBtn = addTodoPopup.querySelector(
  todoConfig.addTodoCloseBtnSelector
);
const todosList = document.querySelector(todoConfig.todosListSelector);

const openModal = (modal) => {
  modal.classList.add(todoConfig.modalVisibleClass);
};

const closeModal = (modal) => {
  modal.classList.remove(todoConfig.modalVisibleClass);
};

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(
    data,
    todoConfig.todoTemplateSelector,
    todoConfig.todoTemplateSelectors
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

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
