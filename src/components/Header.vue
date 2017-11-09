<template>       
    <nav class="app-nav navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">Todo App</a> 
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              
              
               <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
              </li>
              <li class="nav-item" v-if="isLoggedIn">
                 <router-link to="todos" class="nav-link">Todos</router-link>
              </li>
              
            </ul>

            <span class="nav-item float-right" v-if="isLoggedIn">
                <button class="btn btn-default btn-xs nav-link" @click="logoutUser">Logout</button>
            </span>
            <span class="nav-item float-right ml-3" v-else>
                 <small> <router-link to="/" class="btn btn-primary btn-xs nav-link">Login</router-link></small>
            </span>

            <span class="float-right ml-3">{{username}}</span> 
          </div>
    </nav>
</template>


<script>
import {HTTP} from '../http/http';
import axios from 'axios';
import { EventBus } from '../main';
  export default {
    data(){
        return{
            username: ''
          
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.getUserState || false;
        },
    },
    created() {
        this.onUser();
        console.log('hi');
    },
    methods: {
      logoutUser(){

        let token = sessionStorage.getItem('token');
        HTTP.defaults.headers.common['x-auth'] = token;
        
            HTTP.delete('/users/me/token', {headers: {'x-auth': token}}).then((response) => {


                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');

                this.$store.dispatch('setUserState', false);

      
                this.username = '';


            }).catch(error => {
                if(error.response) {
                    
                    console.log(error.response);
                }  
            });
        },
        onUser() {
            // let user = this.$store.getters.getUser;
            // console.log(user);
            // this.username = user.email;
            //when I try doing this using the store it breaks and doesn't work for some reason.  
            EventBus.$on('loggedInUser', (user) => {
                // see how you get this object to get the user.username
                this.username = user.email; 
                console.log(this.username);
            });
        }
    }
}
</script>


<style>
    
    .app-nav {
        margin-bottom:30px;
    }
</style>


