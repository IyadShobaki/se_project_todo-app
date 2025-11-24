"use strict";

var _uuid = require("https://jspm.dev/uuid");

var _constants = require("../utils/constants.js");

var _Todo = _interopRequireDefault(require("../components/Todo.js"));

var _FormValidator = _interopRequireDefault(require("../components/FormValidator.js"));

var _Section = _interopRequireDefault(require("../components/Section.js"));

var _PopupWithForm = _interopRequireDefault(require("../components/PopupWithForm.js"));

var _TodoCounter = _interopRequireDefault(require("../components/TodoCounter.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addTodoButton = document.querySelector(_constants.todoConfig.addTodoButtonSelector);
var addTodoPopup = document.querySelector(_constants.todoConfig.addTodoPopupSelector);
var addTodoForm = addTodoPopup.querySelector(_constants.todoConfig.addTodoFormSelector);
var newTodoValidator = new _FormValidator["default"](_constants.validationConfig, addTodoForm);
var todoCounter = new _TodoCounter["default"]({
  todos: _constants.initialTodos,
  selector: ".counter__text"
});

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) todoCounter.updateCompleted(false);
  todoCounter.updateTotal(false);
}

var generateTodo = function generateTodo(data) {
  var todo = new _Todo["default"]({
    data: data,
    selector: _constants.todoConfig.todoTemplateSelector,
    settings: _constants.todoConfig.todoTemplateSelectors,
    handleCheck: handleCheck,
    handleDelete: handleDelete
  });
  var todoElement = todo.getView();
  todosList.addItem(todoElement);
};

var todosList = new _Section["default"]({
  items: _constants.initialTodos,
  renderer: function renderer(item) {
    generateTodo(item);
  },
  containerSelector: _constants.todoConfig.todosListSelector
});
todosList.renderItems();

var extractTodoValues = function extractTodoValues(inputValues) {
  var name = inputValues.name;
  var dateInput = inputValues.date; // Create a date object and adjust for timezone

  var date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  var completed = false;
  var id = (0, _uuid.v4)();
  var todoValues = {
    id: id,
    name: name,
    completed: completed,
    date: date
  };
  return todoValues;
};

var addTodoPopupForm = new _PopupWithForm["default"](_constants.todoConfig.addTodoPopupSelector, function (inputValues) {
  generateTodo(extractTodoValues(inputValues));
  todoCounter.updateTotal(true);
  newTodoValidator.resetValidation();
});
addTodoButton.addEventListener("click", function () {
  addTodoPopupForm.open();
});
addTodoPopupForm.setEventListeners();
newTodoValidator.enableValidation();