<template>
	     <div v-if="!isLoggedIn">
	        <h1>Login</h1>
	      
	        <form>
	          <div class="row">
	            <div class="col-md-6">
	              <div class="form-group">
	                <label>Email:</label>
	                <input type="text" class="form-control" v-model="user.email">
	              </div>
	            </div>
	            </div>
	            <div class="row">
	              <div class="col-md-6">
	                <div class="form-group">
	                  <label>Password:</label>
	                  <input type="password" class="form-control col-md-6" v-model="user.password">
	                </div>
	              </div>
	            </div><br />
	            <div class="form-group">
	              <button class="btn btn-primary" @click.prevent="signupUser">Sign Up</button>
                  <button class="btn btn-primary" @click.prevent="handler">Login</button>
	            </div>
	        </form>
      </div>
</template>

<script>
import {HTTP} from '../http/http';
import { EventBus } from '../main';
  export default {
    data(){
        return{
           user: {
                username: '',
                password: ''
            }
          
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.getUserState || false;
        }
    },
    methods: {
        emitUser() {
            EventBus.$emit('loggedInUser', this.user);
            // this.$store.dispatch('setUser', this.user);
        },
        signupUser(){
        
            HTTP.post('users', this.user).then((response) => {

              sessionStorage.setItem('token', response.headers['x-auth']);

              sessionStorage.setItem('user', JSON.stringify(this.user));
              
              this.$store.dispatch('setUserState', true);
          
        }).catch(error => {
            if(error.response) {
                let err;
                let errRes = error.response.data;
                if(errRes.errmsg) {
                    err =  errRes.errmsg;
                }
                else {
                    err =  errRes.message;
                }
                this.$alert.danger({ duration: 10000, transition: 'none', message: err })
            }  
        });
      },
      loginUser() {
        
        HTTP.post('users/login', this.user).then((response) => {

          sessionStorage.setItem('token', response.headers['x-auth']);

          sessionStorage.setItem('user', JSON.stringify(this.user));
   
          this.$store.dispatch('setUserState', true);

          this.$alert.success({ duration: 500, transition: 'none', message: 'You are now logged in' })
          
        }).catch(error => {
            if(error.response) {
                
                console.log(error.response.data.message);
            }  
        });
      },
      handler() {
        this.loginUser();
        this.emitUser();
    }
  }
}
</script>
