<template>
  <div class="receive-book-container">
    <h2>Receive Book from User</h2>

    <form @submit.prevent="receiveBookFromUser" class="receive-book-form">
      <div class="form-group">
        <label for="loanId">Loan ID:</label>
        <input type="text" id="loanId" v-model="loanId" required class="input-field"  disabled/>
      </div>

      <button type="submit" class="receive-book-button">Receive Book</button>
    </form>

    <div v-if="message" class="success-message">{{ message }}</div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loanId: this.$route.params.id,
      message: '',
      error: '',
    };
  },
  methods: {
    async receiveBookFromUser() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1/api/books_loan/return/${this.loanId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,

          },
        })

        const data = await response.json();

        if (response.ok) {
          this.message = data.message;
        } else {
          this.error = data.error || 'Failed to receive book from user';
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
.receive-book-container {
  max-width: 400px;
  margin: 0 auto;
}

.receive-book-form {
  display: grid;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.input-field {
  height: 40px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.receive-book-button {
  background-color: #3498db;
  color: white;
  padding: 15px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.receive-book-button:hover {
  background-color: #3498db;
}

.success-message {
  color: #2ecc71;
}

.error-message {
  color: #e74c3c;
}
</style>
