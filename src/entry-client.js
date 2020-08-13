import { createApp } from "./app";
import Vue from "vue";

const { app, router, store } = createApp();

router.onReady(() => {
  app.$mount("#app");

  // fix client-only匹配不到的路由 跳转404
  const matchedComponents = router.getMatchedComponents();
  !matchedComponents.length ? (window.location.href = "/404.html") : "";

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
