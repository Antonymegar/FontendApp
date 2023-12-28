<template>
  <div>
    <h2>Loaned Books</h2>
    <div v-if="loanDetails">
      <div class="loan-details">
        <p><strong>ID:</strong> {{ loanDetails.id }}</p>
        <p><strong>User ID:</strong> {{ loanDetails.user_id }}</p>
        <p><strong>Book ID:</strong> {{ loanDetails.book_id }}</p>
        <p><strong>Loan Date:</strong> {{ loanDetails.loan_date }}</p>
        <p><strong>Due Date:</strong> {{ loanDetails.due_date }}</p>
        <p><strong>Status:</strong> {{ loanDetails.status }}</p>
        <div class="button-container">
        <button @click="sendLoanIdToBackend" class="approve-loan-button">Approve Loan</button>
        <router-link :to="{ name: 'receive-book', params: { id: loanDetails.id } }">
          <button class="receive-book-button">Receive Book</button>
        </router-link>
      </div>
      </div>
      
    </div>
    <div v-else>
      <p>No loan details available.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loanDetails: null,
      responseMessage: '',
    };
  },
  mounted() {
    // Fetch data from the API
    this.fetchLoanDetails();
  },
  methods: {
    async fetchLoanDetails() {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        const response = await fetch('http://127.0.0.1:8000/api/book_loan/loan_requests', { headers });
        const data = await response.json();
        console.log(data);

        if (Array.isArray(data) && data.length > 0) {
          this.loanDetails = data[0];
        } else {
          this.loanDetails = null;
        }
      } catch (error) {
        console.error('Error fetching loan details:', error);
        this.loanDetails = null;
      }
    },

    sendLoanIdToBackend() {
      const token = localStorage.getItem('token');
      fetch(`http://127.0.0.1:8000/api/book_loan/approve/${this.loanDetails.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Loan ID sent to backend:', data);
          this.responseMessage = data.message || 'Loan approved successfully';
        })
        .catch(error => {
          console.error('Error sending loan ID to backend:', error);
        });
    },
  },
};
</script>

<style scoped>
.loan-details {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  margin-left: 100px;
  max-width: 400px;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.approve-loan-button {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #3498db; 
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.receive-book-button {
  margin-top: 20px;
  margin-right: 20px;
  padding: 8px 16px;
  background-color: #87CEEB; 
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
