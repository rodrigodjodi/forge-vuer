import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const viewer = {
  state: {
    viewables: [],
    itemIndex: 0
  },
  mutations: {
    docLoad(state, viewables) {
      state.viewables = viewables;
    },
    changeItem(state, value) {
      state.itemIndex = value;
    }
  },
  actions: {}
};
export default new Vuex.Store({
  modules: { viewer },
  state: {
    scenes: [
      {
        name: "Apartamento",
        urn:
          "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YnJpZ2FkZWlyby9BUFRPX0RFQ09SQURPX0JSR19SMTcuZHdmeA",
        viewType: "orbit"
      },
      {
        name: "Condomínio",
        urn:
          "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dXJiYW5lbmdlL1VSQkFORU5HRS1SMi5kd2Z4",
        viewType: "firstPerson"
      }
    ]
  },
  mutations: {},
  actions: {}
});
