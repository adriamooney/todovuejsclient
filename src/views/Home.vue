<template>
    <div>
        <h1>Home</h1>
        
        <p>Welcome to this little Todo App.  The backend API is built in NodeJS.  The front end is built with VueJS. </p>

        <login></login>

        <p v-if="isLoggedIn"> Start <router-link to="todos">HERE</router-link> to manage your Todo list.</p>

    </div>


</template>

<script>

import Login from '../components/Login.vue';
  export default {
    components: {
        Login
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.getUserState || false;
        }
    },
}
</script>
