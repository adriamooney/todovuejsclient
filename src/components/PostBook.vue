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
                <div class="form-group">
                  <label>Array of ISBNs:</label>
                  <input type="text" class="form-control" v-model="books">
                </div>
	            </div>
	            </div>
	            <div class="form-group">
	              <button class="btn btn-primary" @click.prevent="submitBook(book)">Submit ISBN</button>
                <button class="btn btn-primary" @click.prevent="submitBooks">Submit Array of ISBNs</button>
	            </div>
	        </form>
      </div>
</template>

<script>
import {HTTP} from '../http/http';
import _ from 'lodash';

  export default {
    data(){
        return{
            book: {
     
            },
            books: []
          
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
      submitBooks() {
        //this.books is array
        //loop through array.  for each item in array, do submitBook
        //345402464,345315499

        let b = this.books.split(',');

        this.books = b;
        console.log(this.books);

        for (let bk of this.books) {
              
              // bk = {isbn: bk};
              // bk = {
              //   isbn
              // }
              let obj = {}
              obj.isbn = bk;
            console.log(obj);
            this.submitBook(obj);
        }
      },
      submitBook(book){
        // "9781597808217", "9781937854492", "9781533620149", "9784130671200", "9781518734892", "9783111065229", "3937512012", "9781973844730"
        
        HTTP.post('books', book, {headers: {'x-auth': this.token}}).then((response) => {

          console.log(response);
          this.$alert.success({ duration: 10000, transition: 'none', message: 'you entered '+ response.data })
          this.book = response.data;
          console.log(response.data);
        
          this.$store.dispatch('addBook', this.book);

          let total = this.$store.getters.getTotal;
          this.$store.dispatch('setTotal', total + 1);

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
