<template>
	
	<div>Search
		<input type="text" v-model="terms"><button type="btn btn-primary" @click="searchBook">Search</button>
	</div>
</template>
<script>
	import {HTTP} from '../http/http';
	export default {
     data() {
        return {
            terms: ''
        }
    },
    computed: {

       token() {
            let token = sessionStorage.getItem('token');
            HTTP.defaults.headers.common['x-auth'] = token;
            return token;
        }

    },
    methods: {
        searchBook() {

            let terms = this.terms;

            console.log(terms);  

            HTTP.get(`/book/search?terms=${terms}`, {headers: {'x-auth': this.token}}).then((response) => {
                console.log(response.data);
               


            }).catch(error => {
                if(error.response) {   
                    console.log(error.response.data.message);
                }  
            });

        },
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
    }
}
</script>