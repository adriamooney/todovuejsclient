<template>
    <div>
        <h1>Books</h1>

        <post-book></post-book>

        <transition-group tag="ul" class="list-group" name="fade">
              <li class="list-group-item" v-for="book in books" :key="book._id">{{book.title}}</li>
        </transition-group>


    </div>

</template>

<script>
import {HTTP} from '../http/http';
import PostBook from '../components/PostBook.vue';
  export default {
    components: {
        PostBook
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
            console.log(this.$store.getters.getBook);
            return this.$store.getters.getBook;
        }
    },
    created() {
        if(this.isLoggedIn) {
            this.showBooks();
        }
        else {
            this.$router.push({name: 'Home'});
        }
        
    },
    methods: {
        showBooks() {

            HTTP.get('books', {headers: {'x-auth': this.token}}).then((response) => {
                console.log(response.data);
                this.$store.dispatch('setBook', response.data.books);
               // this.todos =response.data.todos;

            }).catch(error => {
                if(error.response) {   
                    console.log(error.response.data.message);
                }  
            });
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
