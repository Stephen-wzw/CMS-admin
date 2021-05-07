import Vue from "vue";
import App from "./App.vue";
import router from "@/router";

import "@/assets/css/base.css"

// element-ui按需引入
import element from "./plugins/element";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(element);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
