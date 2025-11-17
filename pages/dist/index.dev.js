"use strict";

var _constants = require("../utils/constants.js");

var addTodoButton = document.querySelector(".button_action_add");
var addTodoPopup = document.querySelector("#add-todo-popup");
var addTodoForm = addTodoPopup.querySelector(".popup__form");
var addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
var todoTemplate = document.querySelector("#todo-template");
var todosList = document.querySelector(".todos__list");

var openModal = function openModal(modal) {
  modal.classList.add("popup_visible");
};

var closeModal = function closeModal(modal) {
  modal.classList.remove("popup_visible");
}; // The logic in this function should all be handled in the Todo class.


var generateTodo = function generateTodo(data) {
  var todoElement = todoTemplate.content.querySelector(".todo").cloneNode(true);
  var todoNameEl = todoElement.querySelector(".todo__name");
  var todoCheckboxEl = todoElement.querySelector(".todo__completed");
  var todoLabel = todoElement.querySelector(".todo__label");
  var todoDate = todoElement.querySelector(".todo__date");
  var todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");
  todoNameEl.textContent = data.name;
  todoCheckboxEl.checked = data.completed; // Apply id and for attributes.
  // The id will initially be undefined for new todos.

  todoCheckboxEl.id = "todo-".concat(data.id);
  todoLabel.setAttribute("for", "todo-".concat(data.id)); // If a due date has been set, parsing this it with `new Date` will return a
  // number. If so, we display a string version of the due date in the todo.

  var dueDate = new Date(data.date);

  if (!isNaN(dueDate)) {
    todoDate.textContent = "Due: ".concat(dueDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }));
  }

  todoDeleteBtn.addEventListener("click", function () {
    todoElement.remove();
  });
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
  var values = {
    name: name,
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