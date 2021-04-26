class TodoForm {
  constructor() {
    this.button = document.querySelector(".todo-form__submit");
    this.form = document.querySelector(".todo-form__input");
    console.log("yeah")

  }

  mount() {
    // ここに 作成ボタンが押されたら todo を作成するような処理を追記する
    console.log(this.button);
    document.querySelector(".todo-form__submit").addEventListener("click", function() {
      console.log("submitted1")
      // TODO: todoを作成
    });
  }
}

export default TodoForm;
