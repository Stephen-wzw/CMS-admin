import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Login = () => import("views/auth/AdminLogin");
const Layout = () => import("@/layout");
const ArticleManage = () => import("views/article/ArticleManage");
const ArticleEdit = () => import("views/article/ArticleEdit");
const Category = () => import("views/category/CateManage");
const Comment = () => import("views/comment/CommentManage");
const Message = () => import("views/message/MessageManage");
const About = () => import("views/about/AboutManage");

const routes = [
  {
    path: "/",
    redirect: "/admin/login",
  },
  {
    path: "/admin/login",
    component: Login,
    meta: {
      title: "login",
    },
  },
  {
    path: "/admin",
    component: Layout,
    redirect: "/admin/article-manage",
    children: [
      {
        path: "article-manage",
        component: ArticleManage,
        meta: {
          title: "admin - 文章管理",
        },
      },
      {
        path: "article-edit/:articleId",
        component: ArticleEdit,
        meta: {
          title: "admin - 文章编辑",
        },
      },
      {
        path: "category",
        component: Category,
        meta: {
          title: "admin - 分类管理",
        },
      },
      {
        path: "comment",
        component: Comment,
        meta: {
          title: "admin - 评论管理",
        },
      },
      {
        path: "message",
        component: Message,
        meta: {
          title: "admin - 留言管理",
        },
      },
      {
        path: "about",
        component: About,
        meta: {
          title: "admin - 关于管理",
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  if (to.path === "/admin/login") {
    return next();
  } else {
    const sessionId = window.sessionStorage.getItem("sessionId");
    if (!sessionId) {
      return next("/admin/login");
    }
  }
  next();
});

export default router;
