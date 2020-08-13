<template>
  <div class="mess">
    <div @click="clickAction">{{ message }}</div>
    <div>
      <ul>
        <li v-for="(item, index) of todos" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import indexStoreModule from "../store/module/index";
export default {
  asyncData({ store }) {
    store.registerModule("index", indexStoreModule);
    return store.dispatch("index/fetchTodos");
  },
  data() {
    return {
      message: "Add A ToDo ... "
    };
  },
  computed: {
    todos() {
      return this.$store.state.index.todos;
    }
  },
  mounted() {
    if (window.__INITIAL_STATE__) {
      this.$store.registerModule("index", indexStoreModule, {
        preserveState: true
      });
    }
  },
  methods: {
    clickAction() {
      this.$store.dispatch("index/addTodo", "看电影");
    }
  },
  destroyed() {
    this.$store.unregisterModule("index");
  }
};
</script>
<style lang="scss" scoped>
.mess {
  margin-top: 50px;
  text-align: center;
  font-size: 16px;
  color: green;
  cursor: pointer;
  ul {
    padding: 0;
    li {
      margin: 10px;
    }
  }
}
</style>
