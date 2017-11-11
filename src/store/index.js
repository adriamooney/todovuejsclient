import Vue from 'vue'
import Vuex from 'vuex'
import userState from './modules/userState';
import todos from './modules/todos';
import books from './modules/books';

Vue.use(Vuex)

const state = {
  count: 0
}

const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  },

}

const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 200)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    userState,
    todos,
    books
  }
})

export default store
