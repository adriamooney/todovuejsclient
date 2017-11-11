const state = {
	books: []
};

const getters = {
	getBook(state) {
		return state.books;
	}
};

const mutations = {
	setBook(state, books) {
		state.books = books;
	},
	addBook(state, book) {
		state.books.push(book);
	}
};

const actions = {
	setBook: ({commit}, payload) => {
		commit('setBook', payload);
	},
	addBook: ({ commit }, payload) => {         
		commit('addBook', payload);
	}
};

export default {
	state,
	getters,
	mutations,
	actions
}