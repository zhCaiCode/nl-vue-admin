import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import dict from './modules/dict'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import libarary from './modules/libarary'
import settings from './modules/settings'
import getters from './getters'

Vue.use(Vuex)
Vue.config.devtools=true

const store = new Vuex.Store({
  modules: {
    app,
    dict,
    user,
    tagsView,
    permission,
    libarary,
    settings
  },
  getters
})

export default store
