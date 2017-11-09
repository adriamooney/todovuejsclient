<template>
	<div>
        <div v-if="isLoggedIn">
            <post-todo></post-todo>
            <hr />
    		<h1>Todos</h1>
            <transition-group tag="ul" class="list-group" name="fade">
              <li class="list-group-item" v-for="todo in todos" :key="todo._id">{{todo.text}}  <small v-if="todo.completedAt">- completed: - {{todo.completedAt | moment("DD/MM/YY")}}</small>
                <div class="actions pull-right float-right">
                    <button class="btn btn-sm btn-danger" @click="removeTodo(todo._id)">Delete</button>
                    <button v-if="!todo.completed" class="btn btn-sm" @click="markDone(todo._id)">Mark Done</button>
                </div>
                   
              </li>
            </transition-group>

<!--             <button class="btn btn-sm btn-primary" @click="showTodos">Update Todos</button>

 -->    		
            
            
        </div>
	</div>
</template>

<script>
import {HTTP} from '../http/http';
import axios from 'axios';
import PostTodo from '../components/PostTodo.vue'
  export default {
    // data(){
    //     return{
    //         // todos: []
            
    //     }
    // },
    computed: {
        isLoggedIn() {
            return this.$store.getters.getUserState || false;
        },
        token() {
            let token = sessionStorage.getItem('token');
            HTTP.defaults.headers.common['x-auth'] = token;
            return token;
        },
        todos() {
            console.log(this.$store.getters.getNewTodo);
            return this.$store.getters.getNewTodo
        }
    },
    components: {
    	PostTodo
    },
    created() {
        if(this.isLoggedIn) {
            this.showTodos();
        }
        else {
            this.$router.push({name: 'Home'});
        }
    	
    },
    updated() {
        console.log('updated');
    },
    methods: {
        showTodos() {

            HTTP.get('todos', {headers: {'x-auth': this.token}}).then((response) => {

                this.$store.dispatch('setNewTodo', response.data.todos);
               // this.todos =response.data.todos;

            }).catch(error => {
                if(error.response) {   
                    console.log(error.response.data.message);
                }  
            });
        },
        removeTodo(id) {
            if (confirm('Are you sure you want delete this todo?')) {
                // delete it!
                HTTP.delete(`todos/${id}`, {headers: {'x-auth': this.token}}).then((response) => {
                    let arr = this.todos;
                    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
                    //https://stackoverflow.com/questions/29997710/remove-object-from-array-of-objects
                    //es6 findIndex, then splice
                    const matchesEl = (obj) => obj._id === id;
                    arr.splice(arr.findIndex(matchesEl), 1);

                }).catch(error => {
                    if(error.response) {   
                        console.log(error.response.data.message);
                    }  
                });
            } //else {
                // Do nothing!
            //}
                

        },
        markDone(id) {
            
            HTTP.patch(`todos/${id}`, {completed: true}, {headers: {'x-auth': this.token}}).then((response) => {
                   
                    this.$store.dispatch('markDone', response.data.todo);

            }).catch(error => {
                if(error.response) {   
                    console.log(error.response.data.message);
                }  
            });
        }
  }
}
</script>

<style>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
</style>

