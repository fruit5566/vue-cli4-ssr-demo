import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        alias: ["/index", "/index.html"],
        meta: {
          title: "index page title",
          keyword: "index page keyword",
          description: "index page description"
        },
        component: () => import("../views/Index.vue")
      },
      {
        path: "/about",
        component: () => import("../views/About.vue")
      }
    ]
  });
}
