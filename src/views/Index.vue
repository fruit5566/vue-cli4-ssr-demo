<template>
  <div>
    <div class="mess" @click="clickAction">{{ message }}</div>
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
      message: "index page title"
    };
  },
  computed: {
    todos() {
      return this.$store.state.index.todos;
    }
  },
  methods: {
    clickAction() {
      this.$store.dispatch("index/addTodo", "看电影");
    }
  },
  mounted() {
    // 不生效 ???
    this.$nextTick(() => {
      console.log(this);
      this.$store.dispatch("index/addTodo", "看电影");
    });

    setTimeout(() => {
      this.$store.dispatch("index/addTodo", "看电影12");
    });
  },
  destroyed() {
    this.$store.unregisterModule("index");
  }
};
</script>

<style lang="scss" scoped>
.mess {
  color: green;
}
</style>
