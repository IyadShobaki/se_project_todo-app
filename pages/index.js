import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import {
  initialTodos,
  todoConfig,
  validationConfig,
} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(todoConfig.addTodoButtonSelector);
const addTodoPopup = document.querySelector(todoConfig.addTodoPopupSelector);
const addTodoForm = addTodoPopup.querySelector(todoConfig.addTodoFormSelector);

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

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

const extractTodoValues = (inputValues) => {
  const name = inputValues.name;
  const dateInput = inputValues.date;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const completed = false;
  const id = uuidv4();

  const todoValues = { id, name, completed, date };

  return todoValues;
};

const addTodoPopupForm = new PopupWithForm({
  formSettings: todoConfig,
  handleFormSubmit: (inputValues) => {
    todosList.addItem(generateTodo(extractTodoValues(inputValues)));
    newTodoValidator.resetValidation();
  },
});

addTodoButton.addEventListener("click", () => {
  addTodoPopupForm.open();
});

addTodoPopupForm.setEventListeners();

newTodoValidator.enableValidation();
