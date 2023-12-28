<template>
  <div>
    <h2>List of Books</h2>
    <div v-for="book in books" :key="book.id" class="book-item">
      <div class="book-card">
        <img :src="book.imagePreview" alt="Book Cover" class="book-cover" />
        <div class="book-details">
          <h3>{{ book.name }}</h3>
          <p><strong>Publisher:</strong> {{ book.publisher }}</p>
          <p><strong>ISBN:</strong> {{ book.isbn }}</p>
          <p><strong>Category:</strong> {{ book.category }}</p>
          <p><strong>Subcategory:</strong> {{ book.subCategory }}</p>
          <p><strong>Description:</strong> {{ book.description }}</p>
          <p><strong>Pages:</strong> {{ book.pages }}</p>

          <router-link :to="{ name: 'request-loan', params: { id: book.id } }">
            <button>Request Loan</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
  export default {
    data() {
      return {
        books: [],
      };
    },
    mounted() {
      this.fetchBooks();
    },
    methods: {
      async fetchBooks() {
        try {

          const token = localStorage.getItem('token');
          const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
          const response = await fetch('http://127.0.0.1:8000/api/books/all', {headers});
          const data = await response.json();
          console.log('Response:', response);
          console.log('Data:', data);

          if (Array.isArray(data.data)) {
            this.books = data.data.map(book => ({
              id: book.id,
              name: book.name || 'N/A',
              publisher: book.publisher || 'N/A',
              isbn: book.isbn || 'N/A',
              category: book.category || 'N/A',
              subCategory: book.subCategory || 'N/A',
              description: book.description || 'N/A',
              pages: book.pages || 0,
              imagePreview: book.image || 'https://via.placeholder.com/150',
            }));
          } else {
            this.books = [];
          }
        } catch (error) {
          console.error('Error fetching books:', error);
          this.books = [];
        }
      },
    },
  };
  </script>

<style scoped>
.book-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.book-card {
  display: flex;
  flex-direction: column;
  width: 23%; /* Adjust the width to ensure four cards in one horizontal line */
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.book-cover {
  width: 100%;
  height: auto;
  border-radius: 8px 8px 0 0;
}

.book-details {
  flex-grow: 1;
  padding: 20px;
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
  