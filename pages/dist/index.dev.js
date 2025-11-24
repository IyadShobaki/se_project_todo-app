"use strict";

var _uuid = require("https://jspm.dev/uuid");

var _constants = require("../utils/constants.js");

var _Todo = _interopRequireDefault(require("../components/Todo.js"));

var _FormValidator = _interopRequireDefault(require("../components/FormValidator.js"));

var _Section = _interopRequireDefault(require("../components/Section.js"));

var _PopupWithForm = _interopRequireDefault(require("../components/PopupWithForm.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addTodoButton = document.querySelector(_constants.todoConfig.addTodoButtonSelector);
var addTodoPopup = document.querySelector(_constants.todoConfig.addTodoPopupSelector);
var addTodoForm = addTodoPopup.querySelector(_constants.todoConfig.addTodoFormSelector);
var newTodoValidator = new _FormValidator["default"](_constants.validationConfig, addTodoForm);

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

var addTodoPopupForm = new _PopupWithForm["default"]({
  formSettings: _constants.todoConfig,
  handleFormSubmit: function handleFormSubmit(inputValues) {
    todosList.addItem(generateTodo(extractTodoValues(inputValues)));
    newTodoValidator.resetValidation();
  }
});
addTodoButton.addEventListener("click", function () {
  addTodoPopupForm.open();
});
addTodoPopupForm.setEventListeners();
newTodoValidator.enableValidation();