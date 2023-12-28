<template>
  <div id="app">
    <nav class="navbar">
      <router-link v-if="role === 'admin'" class="nav-link" to="/loan-request">Loan Request</router-link>
      <router-link v-if="role === 'admin'" class="nav-link" to="/register">Register User</router-link>
      <router-link v-if="role === 'admin'" class="nav-link" to="/add-book">Add Book</router-link>
      <router-link v-if="role === 'user'" class="nav-link" to="/books">Books</router-link>
      <router-link v-if="role === 'user'" class="nav-link" to="/mybooks">My Books</router-link>
      <router-link v-if="loggedIn" class="nav-link" to="/login">Logout</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: localStorage.getItem('token') !== null,
      role: localStorage.getItem('userRole') || 'user',
    };
  },
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.nav-link {
  margin-right: 10px;
}
</style>
