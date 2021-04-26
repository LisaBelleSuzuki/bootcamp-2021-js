/**
 * Dispatcher
 */
class Dispatcher extends EventTarget {
  dispatch() {
    this.dispatchEvent(new CustomEvent("event"));
  }

  subscribe(subscriber) {
    this.addEventListener("event", subscriber);
  }
}

/**
 * Action Creator and Action Types
 */
const FETCH_TODO_ACTION_TYPE = "Fetch todo list from server";
export const createFetchTodoListAction = () => ({
  type: FETCH_TODO_ACTION_TYPE,
  payload: undefined,
});

const CLEAR_ERROR = "Clear error from state";
export const clearError = () => ({
  type: CLEAR_ERROR,
  payload: undefined,
});

const ADD_TODO_ACTION_TYPE = "Create add todo action (register new todo)";
export const createAddTodoAction = (input_text) => ({
  type: ADD_TODO_ACTION_TYPE,
  payload: input_text,
});

const CLICK_CHECKBOX = "Click checkbox";
export const createClickCheckboxAction = (todo_id, is_done) => ({
  type: CLICK_CHECKBOX,
  payload: {todo_id, is_done},
});


/**
 * Store Creator
 */
const api = "http://localhost:3000/todo";

const defaultState = {
  todoList: [],
  error: null,
};

const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

const reducer = async (prevState, { type, payload }) => {
  switch (type) {
    case FETCH_TODO_ACTION_TYPE: {
      try {
        const resp = await fetch(api).then((d) => d.json());
        return { todoList: resp.todoList, error: null };
      } catch (err) {
        return { ...prevState, error: err };
      }
    }
    case CLEAR_ERROR: {
      return { ...prevState, error: null };
    }
    case ADD_TODO_ACTION_TYPE: {
      try{
        const params = {
          headers,
          method: 'POST',
          body: JSON.stringify({
            name: payload,
          })
        };
        const resp = await fetch(api, params).then((d) => d.json());
        prevState.todoList.push(resp);
        return { todoList: prevState.todoList, error: null };
      } catch(err) {
        return { ...prevState, error: err}
      }
    }
    case CLICK_CHECKBOX: {
      // checkboxがクリックされた時の処理を追記
      // TODO: 該当のtodoのcheckを入れたり消したり。
      const {todo_id, is_done} = payload;
      console.log(payload);
      prevState.todoList[todo_id].done = !is_done;
      return { ...prevState, error: null}
    }
    default: {
      throw new Error("unexpected action type: %o", { type, payload });
    }
  }
};

export function createStore(initialState = defaultState) {
  const dispatcher = new Dispatcher();
  let state = initialState;

  const dispatch = async ({ type, payload }) => {
    console.group(type);
    console.log("prev", state);
    state = await reducer(state, { type, payload });
    console.log("next", state);
    console.groupEnd();
    dispatcher.dispatch();
  };

  const subscribe = (subscriber) => {
    dispatcher.subscribe(() => subscriber(state));
  };

  return {
    dispatch,
    subscribe,
  };
}
