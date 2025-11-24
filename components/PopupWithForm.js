import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._element.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll(".popup__input");

    const values = {};

    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      if (!this._popupForm.checkValidity()) return;
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}

export default PopupWithForm;
