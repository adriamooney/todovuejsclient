const state = {
	newTodos: []
};


const getters = {
	getNewTodo(state) {
		return state.newTodos;
	}
};

const mutations = {
	setNewTodo(state, newTodos) {
		state.newTodos = newTodos;
	},
	addTodo(state, todo) {
		state.newTodos.push(todo);
	},
	markDone(state, todo){

    	let index = state.newTodos.findIndex(obj => obj._id == todo._id);

        state.newTodos[index].completed = todo.completed;

        state.newTodos[index].completedAt = todo.completedAt;

	}
};

const actions = {
	setNewTodo: ({commit}, payload) => {

		commit('setNewTodo', payload);
	},
	addTodo: ({ commit }, payload) => {         
		commit('addTodo', payload);
	},
	markDone: ({commit}, payload) => {
		commit('markDone', payload);
	}
};

export default {
	state,
	getters,
	mutations,
	actions
}