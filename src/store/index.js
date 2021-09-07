import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keepAlivePage: ['topicIndex','identityIndex','mutualVisits','importVisit','exportVisit','analysis','partner','CooperationProjects','IntelligenceProject','PartnerAgencies'], // 需要缓存的页面，如果说你一开始就要缓存，那么你可以在这里设置初始值，如果你不需一开始就设置缓存，那么设置为空，再通过某种条件通过mutations或者actions改变keepAlivePage
    emptykeepAlivePage: [] ,
    allkeepAlivePage: ['topicIndex','identityIndex','mutualVisits','importVisit','exportVisit','analysis','partner','CooperationProjects','IntelligenceProject','PartnerAgencies'],
  },
  getters: {
    keepAlivePage: state => state.keepAlivePage // 获取需要缓存的页面
  },
  mutations: {
    ADD_KEEP_ALVE: (state, name) => {
      state.keepAlivePage = state.allkeepAlivePage
    },
    EMPTY_KEEP_ALIVE:(state, name) => {
      state.keepAlivePage = state.emptykeepAlivePage
    },
  },
  modules: {
  }
})
