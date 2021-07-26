import { StateObject } from "@/interface";
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

export const initialState: StateObject = {
  level: 1,
  winningData: {},
};

export default new Vuex.Store({
  state: { ...initialState },
  mutations,
  actions,
  getters,
  plugins: [createPersistedState()],
});
