"use strict";

var _uuid = require("https://jspm.dev/uuid");

var _constants = require("../utils/constants.js");

var _Todo = _interopRequireDefault(require("../components/Todo.js"));

var _FormValidator = _interopRequireDefault(require("../components/FormValidator.js"));

var _Section = _interopRequireDefault(require("../components/Section.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addTodoButton = document.querySelector(_constants.todoConfig.addTodoButtonSelector);
var addTodoPopup = document.querySelector(_constants.todoConfig.addTodoPopupSelector);
var addTodoForm = addTodoPopup.querySelector(_constants.todoConfig.addTodoFormSelector);
var addTodoCloseBtn = addTodoPopup.querySelector(_constants.todoConfig.addTodoCloseBtnSelector);

var generateTodo = function generateTodo(data) {
  var todo = new _Todo["default"](data, _constants.todoConfig.todoTemplateSelector, _constants.todoConfig.todoTemplateSelectors);
  var todoElement = todo.getView();
  return todoElement;
};

var todosList = new _Section["default"]({
  items: _constants.initialTodos,
  renderer: function renderer(item) {
    todosList.addItem(generateTodo(item));
  },
  containerSelector: _constants.todoConfig.todosListSelector
});
todosList.renderItems();

var openModal = function openModal(modal) {
  modal.classList.add(_constants.todoConfig.modalVisibleClass);
};

var closeModal = function closeModal(modal) {
  modal.classList.remove(_constants.todoConfig.modalVisibleClass);
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
  todosList.addItem(generateTodo(values));
  newTodoValidator.resetValidation();
  closeModal(addTodoPopup);
});
var newTodoValidator = new _FormValidator["default"](_constants.validationConfig, addTodoForm);
newTodoValidator.enableValidation();