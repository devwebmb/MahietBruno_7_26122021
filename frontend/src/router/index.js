import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import auth from "../auth/auth";
import VueRouteMiddleware from "vue-route-middleware";

// création de plusieurs chemin de routes menant vers les views
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/post",
    name: "Post",
    component: () => import("../views/Post.vue"),
    meta: {
      middleware: auth, // middleware (vue-route-middleware)
    },
  },
  {
    path: "/post/:id",
    name: "OnePost",
    component: () => import("../views/OnePost.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../views/Account.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/addPost",
    name: "AddPost",
    component: () => import("../views/NewPost.vue"),
    meta: {
      middleware: auth,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// middleware avent chaque route
router.beforeEach(VueRouteMiddleware());

export default router;
