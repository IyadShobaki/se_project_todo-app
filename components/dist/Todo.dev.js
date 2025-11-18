"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Todo =
/*#__PURE__*/
function () {
  function Todo(data, selector, settings) {
    _classCallCheck(this, Todo);

    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._settings = settings;
  }

  _createClass(Todo, [{
    key: "_setEventListeners",
    value: function _setEventListeners() {
      var _this = this;

      this._todoDeleteBtn = this._element.querySelector(this._settings.todoDeleteBtnSelector);

      this._todoDeleteBtn.addEventListener("click", function () {
        _this._element.remove();
      });

      this._todoCheckboxEl.addEventListener("change", function () {
        _this._data.completed = !_this._data.completed;
      });
    }
  }, {
    key: "_getTemplate",
    value: function _getTemplate() {
      var todoElement = this._templateElement.content.querySelector(this._settings.todoElementelector).cloneNode(true);

      return todoElement;
    }
  }, {
    key: "_generateCheckboxEl",
    value: function _generateCheckboxEl() {
      this._todoCheckboxEl = this._element.querySelector(this._settings.todoCheckboxElSelector);
      this._todoLabel = this._element.querySelector(this._settings.todoLabelSelector);
      this._todoCheckboxEl.checked = this._data.completed;
      this._todoCheckboxEl.id = "todo-".concat(this._data.id);

      this._todoLabel.setAttribute("for", "todo-".concat(this._data.id));
    }
  }, {
    key: "getView",
    value: function getView() {
      this._element = this._getTemplate();
      this._todoNameEl = this._element.querySelector(this._settings.todoNameElSelector);
      this._todoDateEl = this._element.querySelector(this._settings.todoDateSelector);
      this._todoNameEl.textContent = this._data.name;
      this._todoDateEl.textContent = this._getFromattedDate(this._data.date);

      this._generateCheckboxEl();

      this._setEventListeners();

      return this._element;
    }
  }, {
    key: "_getFromattedDate",
    value: function _getFromattedDate(date) {
      var formattedDate = "";
      var dueDate = new Date(date);

      if (!isNaN(dueDate)) {
        formattedDate = "Due: ".concat(dueDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        }));
      }

      return formattedDate;
    }
  }]);

  return Todo;
}();

var _default = Todo;
exports["default"] = _default;