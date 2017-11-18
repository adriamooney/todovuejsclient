<template>
    <div>
        <h1>Edit Book</h1>
        <div class="row">
          <div class="col-md-10"></div>
          <div class="col-md-2"><router-link :to="{ name: 'Books', params: { skip: 1 }}" class="btn btn-success">Return to Books</router-link></div>
        </div>

        <form v-on:submit.prevent="updateItem">
            <div class="form-group">
                <label>Title</label>book: {{book.title}}
                <input type="text" class="form-control" v-model="book.title">
            </div>

            <div class="form-group">
                <label name="product_price">Author</label>
                <input type="text" class="form-control" v-model="book.authors">
            </div>

            <div class="form-group">
                <button class="btn btn-primary">Update</button>
            </div>
        </form>
    </div>
</template>

<script>
    import {HTTP} from '../http/http';
    export default{
        // data(){
        //     return{
        //         book:{}
        //     }
        // },
        computed: {
        	book() {
        		return this.$store.getters.getBook;
        	}
        },
        created() {
            this.getBook();
        },
        methods: {
            getBook()
            {
              let uri = 'books/edit/' + this.$route.params.id;
                HTTP.get(uri).then((response) => {

                    this.book = response.data;
                    console.log(response.data.book);
                    this.$store.dispatch('setBook', response.data.book);
                }).catch(error => {
                    if(error.response) {
                    	this.$alert.danger({ duration: 10000, transition: 'none', message: error.response.data.message })
                    }  
                });
            },

            updateItem()
            {
              let uri = 'books/update/' + this.$route.params.id;
                HTTP.patch(uri, this.book).then((response) => {
                    setTimeout(() => {
                        this.$router.push({ name: 'Books', params: { skip: 1 }});
                    }, 1000);
                    
                }).catch(error => {
                    if(error.response) {
                        this.$alert.danger({ duration: 10000, transition: 'none', message: error.response.data.message })
                    }  
                });
            }
        }
    }
</script>