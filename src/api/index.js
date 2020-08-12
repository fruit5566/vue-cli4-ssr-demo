export function fetchTodos() {
  return new Promise(resolve => {
    console.log("-----fetchTodos-----");
    setTimeout(() => {
      resolve(["吃饭", "喝水", "睡觉"]);
    }, 10);
  });
}

export function addTodo(item) {
  return new Promise(resolve => {
    console.log("-----addTodo-----");
    setTimeout(() => {
      resolve(item);
    }, 10);
  });
}
