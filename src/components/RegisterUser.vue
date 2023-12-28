<template>
  <div>
    <h1>Register User</h1>
    <form @submit.prevent="registerUser" class="registration-form">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="userData.name" required>

      <label for="email">Email Address:</label>
      <input type="email" id="email" v-model="userData.email" required>

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="userData.password" required>

      <label for="role">Role:</label>
      <input type="text" id="role" v-model="userData.role" required>

      <button type="submit">Register</button>
    </form>
    <div v-if="registrationResponse" class="success-message">{{ registrationResponse }}</div>
    <div v-if="registrationError" class="error-message">{{ registrationError }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterUser',
  data() {
    return {
      userData: {
        name: '',
        email: '',
        password: '',
        role:'',
      },
    };
  },
  methods: {
    registerUser() {

      const token = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      axios.post('http://127.0.0.1:8000/api/users/register', this.userData, { headers })
        .then(response => {
          this.registrationResponse = response.data.message;
          this.clearForm();
        })
        .catch(error => {
          this.registrationError = error.response.data.error || 'Registration failed';
        });
    },

    clearForm() {
      
      this.userData.name = '';
      this.userData.email = '';
      this.userData.password = '';
      this.userData.role = '';
      
      this.registrationResponse = null;
      this.registrationError = null;
    },
  },
};
</script>

<style scoped>
.registration-form {
  max-width: 300px;
  margin: 0 auto;
}

h1 {
  text-align: center;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
}

button {
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

</style>
