import { createApp } from "./app";
import Vue from "vue";

const { app, router, store } = createApp();

router.onReady(() => {
  app.$mount("#app");

  // fix client-only匹配不到的路由 跳转404
  // const matchedComponents = router.getMatchedComponents();
  // !matchedComponents.length ? (window.location.href = "/404.html") : "";

  // fix client-only设置页面 title
  !window.__INITIAL_STATE__ && app.$route.meta.title ? (document.title = app.$route.meta.title) : "";
});

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
} else {
  // client-only 预取数据
  Vue.mixin({
    beforeMount() {
      const { asyncData } = this.$options;
      if (asyncData) {
        // 将获取数据操作分配给 promise
        // 以便在组件中，我们可以在数据准备就绪后
        // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
        this.dataPromise = asyncData({
          store: this.$store,
          route: this.$route
        });
      }
    },
    beforeRouteUpdate(to, from, next) {
      const { asyncData } = this.$options;
      if (asyncData) {
        asyncData({
          store: this.$store,
          route: to
        })
          .then(next)
          .catch(next);
      } else {
        next();
      }
    }
  });
}
