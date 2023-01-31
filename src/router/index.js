import { createRouter, createWebHistory } from "vue-router";
import layout from "../views/Layout.vue";
import connection from "../components/Connection.vue";
import dashboard from "@/components/Dashboard.vue";
import home from "@/components/Home.vue";
import { guard } from "@/services/guard.js";
import internships from "../components/Internships.vue";
import admin from "../components/Admin.vue";
import params from "../components/Params.vue";
import registration from "../components/Registrations.vue";


const routes = [
  {
    path: "/",
    name: "Layout",
    component: layout,
    children: [
      { path: "login", name: "Connection", component: connection },
      {
        path: "dashboard", name: "Dashboard", component: dashboard, children: [
          { path: "", name: "Welcome", component: home },
          { path: "stages", name: "Stages", component: internships },
          { path: "inscriptions", name: "Inscriptions", component: registration },
          { path: "admins", name: "Admin", component: admin },
          { path: "parametres", name: "Paramètres", component: params },
        ]
      },


      { path: ':pathMatch(.*)*', redirect: 'dashboard' }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    if (to.matched[0].path !== '/login') guard();
  }
  else {
    if (to.matched[1].path !== '/login') guard();
  }

  next();
});

export default router;
