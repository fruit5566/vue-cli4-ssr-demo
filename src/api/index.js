export function fetchTodos() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(["吃饭", "喝水", "睡觉"]);
    }, 10);
  });
}

export function addTodo(item) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(item);
    }, 10);
  });
}
