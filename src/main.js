import Vue from 'vue'
import App from './App.vue'
import VueAlert from '@vuejs-pt/vue-alert';
Vue.use(VueAlert);

export const EventBus = new Vue();

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);
Vue.use(require('vue-moment'));

import Home from './views/Home.vue'
import Todos from './views/Todos.vue'
import Books from './views/Books.vue'

import store from './store'

import VueRouter from 'vue-router'
Vue.use(VueRouter);

const routes = [
	{
		name: 'Home',
		path: '/',
		component: Home
	},
	{
		name: 'Todos',
		path: '/todos',
		component: Todos
	},
	{
		name: 'Books',
		path: '/books',
		component: Books
	}

	
];

const router = new VueRouter({ mode: 'history', routes});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
