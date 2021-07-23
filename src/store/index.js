import { createStore } from "vuex";
import getters from "./getters.js";

const modulesFiles = import.meta.globEager('./modules/*.js');

const modules = {};
Object.keys(modulesFiles).forEach(modulePath => {
  const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, "$1");
  modules[moduleName] = modulesFiles[modulePath].default;
})

const store = createStore({
  modules,
  getters
});

export default store;