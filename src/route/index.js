import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default function createRouter() {
  return new Router({
    mode: "history",
    //   base: process.env.BASE_URL
    routes: [
      {
        path: "/",
        alias: ["/index"],
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
      },
      {
        path: "/home",
        component: () => import("../views/Home.vue")
      }
    ]
  });
}
