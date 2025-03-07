import store from "../store.js";
import {
  createClickCheckboxAction,
} from "../flux/index.js";

class Todo {
  constructor(parent, { id, name, done }) {
    this.parent = parent;
    this.props = { id, name, done };
    this.mounted = false;
  }

  mount() {
    if (this.mounted) return;
    // TODOのチェックボックスが押されたときの処理
    this.element.querySelector(".todo-toggle").addEventListener("click", function(){
      store.dispatch(createClickCheckboxAction(this.getAttribute("data-todo-id"), this.value=="checked"));
    });
    // TODO: ここにTODOの削除ボタンが押されたときの処理を追記
    this.mounted = true;
  }

  render() {
    const { id, name, done } = this.props;
    const next = document.createElement("li");
    next.className = "todo-item";
    next.innerHTML = `
      <label class="todo-toggle__container">
        <input
          data-todo-id="${id}"
          type="checkbox"
          class="todo-toggle"
          value="checked"
          ${done ? "checked" : ""}
        />
        <span class="todo-toggle__checkmark"></span>
      </label>
      <div class="todo-name">${name}</div>
      <div data-todo-id="${id}" class="todo-remove-button">x</div>
    `;
    if (!this.element) {
      this.parent.appendChild(next);
    } else {
      this.parent.replaceChild(this.element, next);
    }
    this.element = next;
    this.mount();
  }
}

export default Todo;
