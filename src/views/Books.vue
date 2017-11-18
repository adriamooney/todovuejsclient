<template>
    <div>
        <h1>Books</h1>

        <book-search></book-search>

        <post-book></post-book>
        My Total Books: {{offset}} - {{limit}} of {{getTotal}}
        <button class="btn btn-primary" @click="showLess">Previous</button>
        <button class="btn btn-primary" @click="showMore">Next</button>

        <ul class="list-group">
              <li class="list-group-item" v-for="(book, key, index) in books" :key="book._id">
                 {{book.isbn}}
                <p><b><a :href="book.infoLink" target="_blank">{{book.title}}</a></b> - <span v-for="(author, key, index) in book.authors">{{author}}</span></p>
                <span v-for="cat in book.categories">{{cat}}</span>
                
                <router-link :to="{name: 'EditBook', params: { id: book._id }}" class="btn btn-primary btn-xs float-right">Edit</router-link>
                <button class="float-right btn btn-danger btn-sm" @click="removeBook(book._id)">Delete</button>
              </li>
        </ul>

        <button class="btn btn-primary" @click="showLess">Previous</button>
        <button class="btn btn-primary" @click="showMore">Next</button>


    </div>

</template>

<script>
import {HTTP} from '../http/http';
import PostBook from '../components/PostBook.vue';
import BookSearch from '../components/BookSearch.vue';
  export default {
     data() {
        return {
            count: 0,
            total: 0,
            offset: 0,
            limit: 10
        }
    },
    components: {
        PostBook,
        BookSearch
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.getUserState || false;
        },
        token() {
            let token = sessionStorage.getItem('token');
            HTTP.defaults.headers.common['x-auth'] = token;
            return token;
        },
        books() {
            return this.$store.getters.getBook;
        },
        getTotal() {
            return this.$store.getters.getTotal;
        }
    },
    created() {
        if(this.isLoggedIn) {
            let skip = this.$route.params.skip || 0;
            console.log(skip);
            this.showBooks(skip-1);
        }
        else {
            this.$router.push({name: 'Home'});
        }
        
    },
    methods: {
        showBooks(page) {
            let pg = parseInt(page);
            HTTP.get(`/books/${pg}`, {headers: {'x-auth': this.token}}).then((response) => {
                console.log(response.data);
                // this.total = response.data.total;
                this.$store.dispatch('setTotal', response.data.total);
                this.offset = response.data.offset+1;
                this.limit = this.offset + 9;
                this.$store.dispatch('setBook', response.data.books);

            }).catch(error => {
                if(error.response) {   
                    console.log(error.response.data.message);
                }  
            });
        },
        showMore() {
            this.count = this.count+10;
            this.$route.params.skip = this.count;
            this.$router.push({ name: 'Books', params: { skip: this.count }});


            this.showBooks(this.$route.params.skip);

        },
        showLess() {
            this.count = this.count-10;
            this.$route.params.skip = this.count;
            this.$router.push({ name: 'Books', params: { skip: this.count }});


            this.showBooks(this.$route.params.skip);

        },
        removeBook(id) {
            if (confirm('Are you sure you want delete this book?')) {
                // delete it!
                HTTP.delete(`books/${id}`, {headers: {'x-auth': this.token}}).then((response) => {
                    let arr = this.books;
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
            } 
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
