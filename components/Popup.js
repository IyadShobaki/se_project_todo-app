class Popup {
  constructor({ popupSettings }) {
    this._popupSettings = popupSettings;
    this._element = document.querySelector(
      this._popupSettings.addTodoPopupSelector
    );
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }

  open() {
    this._element.classList.add(this._popupSettings.popupVisibleClass);
    document.addEventListener("keyup", this._handleEscapeClose);
  }
  close() {
    this._element.classList.remove(this._popupSettings.popupVisibleClass);
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._element.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains(this._popupSettings.popupClass) ||
        evt.target.classList.contains(this._popupSettings.addTodoCloseBtnClass)
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
