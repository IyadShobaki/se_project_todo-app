"use strict";

var _uuid = require("https://jspm.dev/uuid");

var _constants = require("../utils/constants.js");

var _Todo = _interopRequireDefault(require("../components/Todo.js"));

var _FormValidator = _interopRequireDefault(require("../components/FormValidator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addTodoButton = document.querySelector(_constants.todoConfig.addTodoButtonSelector);
var addTodoPopup = document.querySelector(_constants.todoConfig.addTodoPopupSelector);
var addTodoForm = addTodoPopup.querySelector(_constants.todoConfig.addTodoFormSelector);
var addTodoCloseBtn = addTodoPopup.querySelector(_constants.todoConfig.addTodoCloseBtnSelector);
var todosList = document.querySelector(_constants.todoConfig.todosListSelector);

var openModal = function openModal(modal) {
  modal.classList.add(_constants.todoConfig.modalVisibleClass);
};

var closeModal = function closeModal(modal) {
  modal.classList.remove(_constants.todoConfig.modalVisibleClass);
}; // The logic in this function should all be handled in the Todo class.


var generateTodo = function generateTodo(data) {
  var todo = new _Todo["default"](data, _constants.todoConfig.todoTemplateSelector, _constants.todoConfig.todoTemplateSelectors);
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
  todosList.append(generateTodo(values));
  newTodoValidator.resetValidation();
  closeModal(addTodoPopup);
});

_constants.initialTodos.forEach(function (item) {
  todosList.append(generateTodo(item));
});

var newTodoValidator = new _FormValidator["default"](_constants.validationConfig, addTodoForm);
newTodoValidator.enableValidation();