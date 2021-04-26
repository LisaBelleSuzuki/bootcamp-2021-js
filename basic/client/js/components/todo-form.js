import store from "../store.js";
import {
  createAddTodoAction,
} from "../flux/index.js";

class TodoForm {
  constructor() {
    this.button = document.querySelector(".todo-form__submit");
    this.form = document.querySelector(".todo-form__input");
    console.log("yeah")
  }

  mount() {
    // ここに 作成ボタンが押されたら todo を作成するような処理を追記する
    document.querySelector(".todo-form__submit").addEventListener("click", function() {
      console.log("submitted todo");
      store.dispatch(createAddTodoAction(document.querySelector(".todo-form__input").value));
    });
  }
}

export default TodoForm;
