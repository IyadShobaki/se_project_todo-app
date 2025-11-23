import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import {
  initialTodos,
  todoConfig,
  validationConfig,
} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";

const addTodoButton = document.querySelector(todoConfig.addTodoButtonSelector);
const addTodoPopup = document.querySelector(todoConfig.addTodoPopupSelector);
const addTodoForm = addTodoPopup.querySelector(todoConfig.addTodoFormSelector);
const addTodoCloseBtn = addTodoPopup.querySelector(
  todoConfig.addTodoCloseBtnSelector
);

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    todoConfig.todoTemplateSelector,
    todoConfig.todoTemplateSelectors
  );
  const todoElement = todo.getView();
  return todoElement;
};

const todosList = new Section({
  items: initialTodos,
  renderer: (item) => {
    todosList.addItem(generateTodo(item));
  },
  containerSelector: todoConfig.todosListSelector,
});

todosList.renderItems();
const openModal = (modal) => {
  modal.classList.add(todoConfig.modalVisibleClass);
};

const closeModal = (modal) => {
  modal.classList.remove(todoConfig.modalVisibleClass);
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

  todosList.addItem(generateTodo(values));

  newTodoValidator.resetValidation();
  closeModal(addTodoPopup);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
