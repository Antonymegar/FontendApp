<template>
  <div class="request-book-container">
    <h2>Request Book Loan</h2>

    <form @submit.prevent="requestBookLoan" class="request-book-form">
      <div class="form-group">
        <label for="bookId">Book ID:</label>
        <input type="text" id="bookId" v-model="bookId" required class="input-field" disabled />
      </div>

      <div class="form-group">
        <label for="userId">User ID:</label>
        <input type="text" id="userId" v-model="userId" required class="input-field" disabled />
      </div>

      <div class="form-group">
        <label for="loanDate">Loan Date:</label>
        <input type="text" id="loanDate" v-model="loanDate" required class="input-field" disabled />
      </div>

      <div class="form-group">
        <label for="dueDate">Due Date:</label>
        <input type="date" id="dueDate" v-model="dueDate" required class="input-field" :min="minDueDate" />
      </div>

      <button type="submit" class="request-loan-button">Request Loan</button>
    </form>

    <div v-if="message" class="success-message">{{ message }}</div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookId: '',
      userId: '',
      loanDate: '',
      dueDate: '',
      message: '',
      error: '',
    };
  },
  mounted() {
    this.userId = localStorage.getItem('userId');
    this.bookId = this.$route.params.id;

    
    this.loanDate = new Date().toISOString().split('T')[0];
  },
  computed: {
    
    minDueDate() {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);
      return currentDate.toISOString().split('T')[0];
    },
  },
  methods: {
    async requestBookLoan() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/api/books_loan/borrow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            book_id: this.bookId,
            user_id: this.userId,
            loan_date: this.loanDate,
            due_date: this.dueDate,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          this.message = data.message;
        } else {
          this.error = data.error || 'Failed to request book loan';
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
.request-book-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.request-book-form {
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

.request-loan-button {
  background-color: #3498db;
  color: white;
  padding: 15px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.request-loan-button:hover {
  background-color: #2980b9;
}

.success-message {
  color: #2ecc71;
  margin-top: 10px;
}

.error-message {
  color: #e74c3c;
  margin-top: 10px;
}
</style>
