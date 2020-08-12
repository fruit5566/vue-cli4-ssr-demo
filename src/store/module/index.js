import { fetchTodos } from "@/api";

export default {
  namespaced: true,
  state: () => ({
    todos: []
  }),
  actions: {
    fetchTodos: ({ commit }) => {
      return fetchTodos().then(todos => {
        commit("setTodos", todos);
      });
    },
    addTodo: ({ commit }, item) => {
      return commit("pushTodo", item);
    }
  },
  mutations: {
    setTodos: (state, todos) => {
      state.todos = todos;
    },
    pushTodo: (state, item) => {
      state.todos.push(item);
    }
  }
};
