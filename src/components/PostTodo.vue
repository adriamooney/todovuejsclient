<template>
	     <div v-if="isLoggedIn">
	        <h2>New Todo</h2>
	      
	        <form>
	          <div class="row">
	            <div class="col-md-6">
	              <div class="form-group">
	                <label>Todo:</label>
	                <input type="text" class="form-control" v-model="todo.text">
	              </div>
	            </div>
	            </div>
	            <div class="form-group">
	              <button class="btn btn-primary" @click.prevent="submitTodo">Submit Todo</button>
	            </div>
	        </form>
      </div>
</template>

<script>
import {HTTP} from '../http/http';

  export default {
    data(){
        return{
            todo: {

            }
          
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.getUserState || false;
        }
    },
    methods: {
      submitTodo(){

        let token = sessionStorage.getItem('token');

        HTTP.defaults.headers.common['x-auth'] = token;
        
        HTTP.post('todos', this.todo, {headers: {'x-auth': token}}).then((response) => {

          console.log(response);
          this.$alert.success({ duration: 10000, transition: 'none', message: 'you entered '+ response.data.text })
          this.todo = response.data;
        
          this.$store.dispatch('addTodo', this.todo);

          this.todo = {};
          
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
      }
  }
}
</script>
