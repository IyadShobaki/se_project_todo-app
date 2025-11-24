import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor({ formSettings, handleFormSubmit }) {
    super({ popupSettings: formSettings });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._element.querySelector(
      this._popupSettings.addTodoFormSelector
    );
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll(
      this._popupSettings.addTodoInputSelector
    );

    const values = {};

    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}

export default PopupWithForm;
