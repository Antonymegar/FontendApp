<template>
  <div class="my-books-container">
    <h2>My Books</h2>

    <div v-if="loanedBooks.length > 0" class="card-container">
      <div v-for="book in loanedBooks" :key="book.id" class="book-item">
        <p><strong>Loan ID:</strong> {{ book.id}}</p>
        <p><strong>Book ID:</strong> {{ book.book_id }}</p>
        <p><strong>Loan Date:</strong> {{ book.loan_date }}</p>
        <p><strong>Due Date:</strong> {{ book.due_date }}</p>
        <p><strong>Status:</strong> {{ book.status }}</p>
        <router-link :to="{ name: 'extend-loan', params: { id: book.id } }">
          <button>Extend Loan</button>
        </router-link>
      </div>
    </div>

    <div v-else>
      <p>No books available.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loanedBooks: [],
    };
  },
  mounted() {
    // Fetch the logged-in user ID from localStorage or your authentication system
    const userId = localStorage.getItem('userId');

    // Fetch loaned books for the logged-in user
    this.fetchLoanedBooks(userId);
  },
  methods: {
    async fetchLoanedBooks(userId) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/book_loan/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (Array.isArray(data)) {
          this.loanedBooks = data;
        } else {
          this.loanedBooks = [];
        }
      } catch (error) {
        console.error('Error fetching loaned books:', error);
        this.loanedBooks = [];
      }
    },
  },
};
</script>

<style scoped>
.my-books-container {
  max-width: 800px;
  margin: 0 auto;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.book-item {
  flex: 0 0 calc(25% - 20px); /* Adjust the width as needed */
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
}

button {
  background-color: #3498db;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}
</style>
