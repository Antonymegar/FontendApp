<template>
    <div>
    <h2>Login</h2>

    <form @submit.prevent="login" class="login-form">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Login</button>
    </form>

    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            const token = data.authorisation.token;
            const userRole = data.user.role;
            const userId = data.user.id
  
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('userId',userId)
  
            if (userRole === 'admin') {
              this.$router.push('/add-book');
            } else {
              this.$router.push('/books');
            }
          } else {
            this.error = data.error || 'Failed to login';
          }
        } catch (error) {
          console.error('Error:', error);
          this.error = 'An unexpected error occurred';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-form {
  max-width: 300px;
  margin: 0 auto;
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
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-message {
  color: #ff0000;
  margin-top: 10px;
}
  </style>
  