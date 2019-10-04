import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store";
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/dcl",
      name: "dcl",
      component: Home,
      meta: {
        urn:
          "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6ZGNsL0NEUEFSQU5BX0lNUExBTlRBX1IwLTA2LXdlYi5kd2Z4",
        title: "Armazém 07 e Armazém 09",
        defaultView: 2
      }
    },
    {
      path: "/bake",
      name: "bake",
      component: Home,
      meta: {
        urn:
          "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YmFrZWZieC93YWxsLWJha2UuRkJY",
        title: "bake fbx",
        defaultView: 2
      }
    },
    {
      path: "/cwg",
      name: "lessence",
      component: Home,
      meta: {
        urn:
          "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y3dnL0xFU1NFTkNFX1I2LTAxLmR3Zng",
        title: "L'Èssence R6",
        defaultView: 0
      }
    },
    {
      path: "/expedition",
      name: "expedition",
      component: Home,
      meta: {
        urn:
          "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y3dnL01BQ0VET19CQVNFX1IwLTAxLmR3Zng",
        title: "Expedition",
        defaultView: 3
      }
    },
    {
      path: "/cantu",
      name: "orleans",
      component: Home,
      meta: {
        urn:
          "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2FudHUvT1JMRUFOU19JTVBMQU5UQUNBT19SMC5kd2Z4",
        title: "Centro Logístico Orleans",
        defaultView: 0
      }
    },
    {
      path: "/rox",
      name: "rox",
      component: Home,
      meta: {
        urn:
          "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXZhbnR0aS9ST1hfUjAuZHdmeA",
        title: "ROX Cabral",
        defaultView: 0
      }
    },
    {
      path: "/mp3",
      name: "MP3",
      component: Home,
      meta: {
        urn: "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Zm9ydGUvbXAzLkZCWA",
        title: "MP3",
        defaultView: 0
      }
    },
    {
      path:"/costareale",
      name: "Costa Reale",
      component: Home,
      meta: {
        urn: "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cGllbW9udGUvQ09TVEEtUkVBTEVfSVNPX1IwLmR3Zng",
        title: "Costa Reale",
        defaultView: 0
      }
    }
  ]
});
router.beforeResolve((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.meta.defaultView) {
    store.commit("changeItem", to.meta.defaultView);
  }
  next();
});
export default router;
