"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Popup =
/*#__PURE__*/
function () {
  function Popup(popupSelector) {
    _classCallCheck(this, Popup);

    this._element = document.querySelector(popupSelector);
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }

  _createClass(Popup, [{
    key: "open",
    value: function open() {
      this._element.classList.add("popup_visible");

      document.addEventListener("keyup", this._handleEscapeClose);
    }
  }, {
    key: "close",
    value: function close() {
      this._element.classList.remove("popup_visible");

      document.removeEventListener("keyup", this._handleEscapeClose);
    }
  }, {
    key: "_handleEscapeClose",
    value: function _handleEscapeClose(evt) {
      if (evt.key === "Escape") {
        this.close();
      }
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this = this;

      this._element.addEventListener("mousedown", function (evt) {
        if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close")) {
          _this.close();
        }
      });
    }
  }]);

  return Popup;
}();

var _default = Popup;
exports["default"] = _default;