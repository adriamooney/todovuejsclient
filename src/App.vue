<template>
    <div class="container">
      <app-header></app-header> 
      <vue-alert></vue-alert>
        <div>
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>

import appHeader from './components/Header.vue';
import {HTTP} from './http/http';
import { EventBus } from './main';
  export default {
    // data() {
    //     return {
    //         loggedIn
    //     }
    // },
    mounted() {
      this.emitUser();
    },
    created() {



        let obj = JSON.parse(sessionStorage.getItem('user'));
        

        let token = sessionStorage.getItem('token');

        if(token && obj) {

             HTTP.post('users/login', obj).then((response) => {

              sessionStorage.setItem('token', response.headers['x-auth']);
       
              this.$store.dispatch('setUserState', true);

              // this.$alert.success({ duration: 10000, transition: 'none', message: 'You are logged in' })
              
            }).catch(error => {
                if(error.response) {
                    
                    console.log(error.response.data.message);
                }  
            });
        }

    },
    components: {
        appHeader
    },
    methods: {
      emitUser() {
            let user = JSON.parse(sessionStorage.getItem('user'));
            EventBus.$emit('loggedInUser', user);
  
            
            // this.$store.dispatch('setUser', this.user);
        },
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
