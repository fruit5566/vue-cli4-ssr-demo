export function fetchTodos() {
  return new Promise(resolve => {
    resolve(["吃饭", "喝水", "睡觉"]);
  });
}

export function addTodo(item) {
  return new Promise(resolve => {
    resolve(item);
  });
}
