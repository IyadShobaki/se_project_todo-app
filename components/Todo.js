class Todo {
  constructor(data, selector, settings) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._settings = settings;
  }
  _setEventListeners() {
    this._todoDeleteBtn = this._element.querySelector(
      this._settings.todoDeleteBtnSelector
    );
    this._todoDeleteBtn.addEventListener("click", () => {
      this._element.remove();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
    });
  }
  _getTemplate() {
    const todoElement = this._templateElement.content
      .querySelector(this._settings.todoElementelector)
      .cloneNode(true);

    return todoElement;
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._element.querySelector(
      this._settings.todoCheckboxElSelector
    );
    this._todoLabel = this._element.querySelector(
      this._settings.todoLabelSelector
    );

    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._element = this._getTemplate();

    this._todoNameEl = this._element.querySelector(
      this._settings.todoNameElSelector
    );
    this._todoDate = this._element.querySelector(
      this._settings.todoDateSelector
    );

    this._todoNameEl.textContent = this._data.name;
    this._todoDate.textContent = this._getFromattedDate(this._data.date);

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._element;
  }

  _getFromattedDate(date) {
    let formattedDate = "";
    const dueDate = new Date(date);
    if (!isNaN(dueDate)) {
      formattedDate = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
    return formattedDate;
  }
}

export default Todo;
