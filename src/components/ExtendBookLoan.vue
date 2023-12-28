<template>
  <div class="extend-loan-container">
    <h2>Extend Book Loan</h2>

    <form @submit.prevent="extendBookLoan" class="extend-loan-form">
      <div class="form-group">
        <label for="loanId">Loan ID:</label>
        <input type="text" id="loanId" v-model="loanId" required class="input-field" disabled />
      </div>

      <div class="form-group">
  <label for="extendDate">Extend Date:</label>
  <input type="date" id="extendDate" v-model="extendDate" required class="input-field" :min="minDueDate" />
     </div>


      <button type="submit" class="extend-loan-button">Extend Loan</button>
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
      extendDate: '',
      message: '',
      error: '',
    };
  },
  computed: {
   
    minDueDate() {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);
      return currentDate.toISOString().split('T')[0];
    },
  },
  methods: {
    async extendBookLoan() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/book_loan/extend/${this.loanId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            extension_date: this.extendDate,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          this.message = data.message;
        } else {
          this.error = data.error || 'Failed to extend book loan';
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
.extend-loan-container {
  max-width: 400px;
  margin: 0 auto;
}

.extend-loan-form {
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

.extend-loan-button {
  background-color: #3498db;
  color: white;
  padding: 15px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.extend-loan-button:hover {
  background-color: #2980b9;
}

.success-message {
  color: #2ecc71;
}

.error-message {
  color: #e74c3c;
}
</style>
