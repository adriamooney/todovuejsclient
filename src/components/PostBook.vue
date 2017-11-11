<template>
	     <div v-if="isLoggedIn">
	        <h2>New Book</h2>
	      
	        <form>
	          <div class="row">
	            <div class="col-md-6">
	              <div class="form-group">
	                <label>ISBN:</label>
	                <input type="text" class="form-control" v-model="book.isbn">
	              </div>
	            </div>
	            </div>
	            <div class="form-group">
	              <button class="btn btn-primary" @click.prevent="submitBook">Submit ISBN</button>
	            </div>
	        </form>
      </div>
</template>

<script>
import {HTTP} from '../http/http';

  export default {
    data(){
        return{
            book: {
     
            }
          
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.getUserState || false;
        },
        token() {
            let token = sessionStorage.getItem('token');
            HTTP.defaults.headers.common['x-auth'] = token;
            return token;
        }
    },
    methods: {
      submitBook(){
        
        HTTP.post('books', this.book, {headers: {'x-auth': this.token}}).then((response) => {

          console.log(response);
          this.$alert.success({ duration: 10000, transition: 'none', message: 'you entered '+ response.data })
          this.book = response.data;
        
          this.$store.dispatch('addBook', this.book);

          this.book = {};
          
        }).catch(error => {
          console.log(error);
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
