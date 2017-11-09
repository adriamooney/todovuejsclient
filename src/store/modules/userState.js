//look into adding auth to here.
//https://stackoverflow.com/questions/46097687/vuex-passing-multiple-parameters-to-action

const state = {
	loggedIn: false,
	user: {email: '', password: ''}
};


const getters = {
	getUserState(state) {
		return state.loggedIn;
	},
	getUser(state) {
		return state.user;
	}
};

const mutations = {
	setUserState(state, loggedIn) {

		state.loggedIn = loggedIn;
		console.log(state.loggedIn);
	},
	setUser(state, user) {
		state.user = user;
	}
};

const actions = {
	setUserState: ({commit}, payload) => {
		commit('setUserState', payload);
	},
	setUser: ({commit}, payload) => {
		commit('setUser', payload);
	}
};

export default {
	state,
	getters,
	mutations,
	actions
}