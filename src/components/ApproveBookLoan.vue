<template>
  <div class="approve-loan-container">
    <h2>Approve Book Loan</h2>

    <form @submit.prevent="approveLoan" class="approve-loan-form">
      <div class="form-group">
        <label for="loanId">Loan ID:</label>
        <input type="text" id="loanId" v-model="loanId" required class="input-field" />
      </div>

      <div class="form-group">
        <label for="loanDate">Loan Date:</label>
        <input type="date" id="loanDate" v-model="loanDate" required class="input-field" />
      </div>

      <div class="form-group">
        <label for="dueDate">Due Date:</label>
        <input type="date" id="dueDate" v-model="dueDate" required class="input-field" />
      </div>

      <div class="form-group">
        <label for="returnDate">Return Date:</label>
        <input type="date" id="returnDate" v-model="returnDate" required class="input-field" />
      </div>

      <div class="form-group">
        <label for="penaltyAmount">Penalty Amount:</label>
        <input type="number" id="penaltyAmount" v-model="penaltyAmount" required class="input-field" />
      </div>

      <div class="form-group">
        <label for="penaltyStatus">Penalty Status:</label>
        <input type="text" id="penaltyStatus" v-model="penaltyStatus" required class="input-field" />
      </div>

      <div class="form-group">
        <label for="status">Status:</label>
        <input type="text" id="status" v-model="status" required class="input-field" />
      </div>

      <button type="submit" class="approve-loan-button">Approve Loan</button>
    </form>

    <div v-if="message" class="success-message">{{ message }}</div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loanId: '',
      loanDate: '',
      dueDate: '',
      returnDate: '',
      penaltyAmount: '',
      penaltyStatus: '',
      status: '',
      message: '',
      error: '',
    };
  },
  methods: {
    async approveLoan() {
      try {
        const response = await fetch('http://localhost:8000/api/book_loan/approve', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            loanId: this.loanId,
            loanDate: this.loanDate,
            dueDate: this.dueDate,
            returnDate: this.returnDate,
            penaltyAmount: this.penaltyAmount,
            penaltyStatus: this.penaltyStatus,
            status: this.status,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          this.message = data.message;
          this.clearForm();
        } else {
          this.error = data.error || 'Failed to approve loan';
        }
      } catch (error) {
        console.error('Error:', error);
        this.error = 'An unexpected error occurred';
      }
    },
    clearForm() {
      this.loanId = '';
      this.loanDate = '';
      this.dueDate = '';
      this.returnDate = '';
      this.penaltyAmount = '';
      this.penaltyStatus = '';
      this.status = '';
    },
  },
};
</script>

<style scoped>
.approve-loan-container {
  max-width: 400px;
  margin: 0 auto;
}

.approve-loan-form {
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

.approve-loan-button {
  background-color: #3498db;
  color: white;
  padding: 15px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.approve-loan-button:hover {
  background-color: #3498db;
}

.success-message {
  color: #4caf50;
}

.error-message {
  color: #f44336;
}
</style>
