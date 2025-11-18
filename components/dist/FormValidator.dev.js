"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FormValidator =
/*#__PURE__*/
function () {
  function FormValidator(settings, form) {
    _classCallCheck(this, FormValidator);

    this._settings = settings;
    this._form = form;
  }

  _createClass(FormValidator, [{
    key: "enableValidation",
    value: function enableValidation() {
      this._form.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });

      this._setEventListeners();
    }
  }, {
    key: "_setEventListeners",
    value: function _setEventListeners() {
      var _this = this;

      this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
      this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);

      this._toggleButtonState();

      this._inputList.forEach(function (inputElement) {
        inputElement.addEventListener("input", function () {
          _this._checkInputValidity(inputElement);

          _this._toggleButtonState();
        });
      });
    }
  }, {
    key: "_toggleButtonState",
    value: function _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._buttonElement.classList.add(this._settings.inactiveButtonClass);

        this._buttonElement.disabled = true;
      } else {
        this._buttonElement.classList.remove(this._settings.inactiveButtonClass);

        this._buttonElement.disabled = false;
      }
    }
  }, {
    key: "_hasInvalidInput",
    value: function _hasInvalidInput() {
      return this._inputList.some(function (inputElement) {
        return !inputElement.validity.valid;
      });
    }
  }, {
    key: "_checkInputValidity",
    value: function _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
  }, {
    key: "_hideInputError",
    value: function _hideInputError(inputElement) {
      var errorElementId = "#".concat(inputElement.id, "-error");

      var errorElement = this._form.querySelector(errorElementId);

      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.classList.remove(this._settings.errorClass);
      errorElement.textContent = "";
    }
  }, {
    key: "_showInputError",
    value: function _showInputError(inputElement, errorMessage) {
      var errorElementId = "#".concat(inputElement.id, "-error");

      var errorElement = this._form.querySelector(errorElementId);

      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._settings.errorClass);
    }
  }]);

  return FormValidator;
}();

var _default = FormValidator;
exports["default"] = _default;