import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Login = () => import("views/auth/AdminLogin");
const Layout = () => import("@/layout");
const ArticleManage = () => import("views/article/ArticleManage");
const ArticleEdit = () => import("views/article/ArticleEdit")
const Category = () => import("views/category/CateManage");
const Comment = () => import("views/comment/CommentManage");
const Message = () => import("views/message/MessageManage");
const About = () => import("views/about/AboutManage");
const Setting = () => import("views/setting/SysSetting");

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/admin",
    component: Layout,
    redirect: "/admin/article-manage",
    children: [
      {
        path: "article-manage",
        component: ArticleManage,
      },
      {
        path: "article-edit",
        component: ArticleEdit,
      },
      {
        path: "category",
        component: Category,
      },
      {
        path: "comment",
        component: Comment,
      },
      {
        path: "message",
        component: Message,
      },
      {
        path: "about",
        component: About,
      },
      {
        path: "setting",
        component: Setting,
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
  next();
});

export default router;
