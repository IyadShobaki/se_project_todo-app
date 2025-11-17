"use strict";

var _constants = require("../utils/constants.js");

var _Todo = _interopRequireDefault(require("../components/Todo.js"));

var _uuid = require("https://jspm.dev/uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addTodoButton = document.querySelector(_constants.config.addTodoButtonSelector);
var addTodoPopup = document.querySelector(_constants.config.addTodoPopupSelector);
var addTodoForm = addTodoPopup.querySelector(_constants.config.addTodoFormSelector);
var addTodoCloseBtn = addTodoPopup.querySelector(_constants.config.addTodoCloseBtnSelector);
var todosList = document.querySelector(_constants.config.todosListSelector);

var openModal = function openModal(modal) {
  modal.classList.add(_constants.config.modalVisibleClass);
};

var closeModal = function closeModal(modal) {
  modal.classList.remove(_constants.config.modalVisibleClass);
}; // The logic in this function should all be handled in the Todo class.


var generateTodo = function generateTodo(data) {
  var todo = new _Todo["default"](data, _constants.config.todoTemplateSelector, _constants.config.todoTemplateSelectors);
  var todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", function () {
  openModal(addTodoPopup);
});
addTodoCloseBtn.addEventListener("click", function () {
  closeModal(addTodoPopup);
});
addTodoForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  var name = evt.target.name.value;
  var dateInput = evt.target.date.value; // Create a date object and adjust for timezone

  var date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  var completed = false;
  var id = (0, _uuid.v4)();
  var values = {
    id: id,
    name: name,
    completed: completed,
    date: date
  };
  var todo = generateTodo(values);
  todosList.append(todo);
  closeModal(addTodoPopup);
});

_constants.initialTodos.forEach(function (item) {
  var todo = generateTodo(item);
  todosList.append(todo);
});