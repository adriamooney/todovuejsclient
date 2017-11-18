const state = {
	books: [],
	total: 0
};

const getters = {
	getBook(state) {
		return state.books;
	},
	getTotal(state) {
		return state.total;
	}
};

const mutations = {
	setBook(state, books) {
		state.books = books;
	},
	addBook(state, book) {
		state.books.push(book);
	},
	setTotal(state, total) {
		state.total = total;
	}
};

const actions = {
	setBook: ({commit}, payload) => {
		commit('setBook', payload);
	},
	addBook: ({ commit }, payload) => {         
		commit('addBook', payload);
	},
	setTotal: ({ commit }, payload) => {         
		commit('setTotal', payload);
	},

};

export default {
	state,
	getters,
	mutations,
	actions
}