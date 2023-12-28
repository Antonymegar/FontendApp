<template>
  <div class="add-book-container">
    <h2>Add Book</h2>

    <form @submit.prevent="addBook" class="add-book-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required class="input-field" />
      </div>

      <div class="form-group">
        <label for="publisher">Publisher:</label>
        <input type="text" id="publisher" v-model="publisher" required class="input-field" />
      </div>

      <div class="form-group">
        <label for="isbn">ISBN:</label>
        <input type="text" id="isbn" v-model="isbn" required class="input-field" />
      </div>

      <div class="form-group">
        <label for="category">Category:</label>
        <input type="text" id="category" v-model="category" required class="input-field" />
      </div>

      <div class="form-group">
        <label for="subCategory">Sub Category:</label>
        <input type="text" id="subCategory" v-model="subCategory" required class="input-field" />
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="description" required class="input-field"></textarea>
      </div>

      <div class="form-group">
        <label for="pages">Pages:</label>
        <input type="number" id="pages" v-model="pages" required class="input-field" />
      </div>

      <div class="form-group">
        <label for="image">Image:</label>
        <input type="file" id="image" @change="handleImageChange" accept="image/*" required class="input-field" />
        <img v-if="image" :src="imagePreview" alt="Image Preview" class="image-preview" />
      </div>

      <button type="submit" class="add-book-button">Add Book</button>
    </form>

    <div v-if="message" class="success-message">{{ message }}</div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      publisher: '',
      isbn: '',
      category: '',
      subCategory: '',
      description: '',
      pages: 0,
      image: null,
      imagePreview: null,
      addedBy: '',
      message: '',
      error: '',
    };
  },
  methods: {
    handleImageChange(event) {
      this.image = event.target.files[0];
      this.imagePreview = URL.createObjectURL(this.image);
    },

    async addBook() {
      try {
        const formData = new FormData();
        formData.append('name', this.name);
        formData.append('publisher', this.publisher);
        formData.append('isbn', this.isbn);
        formData.append('category', this.category);
        formData.append('sub_category', this.subCategory);
        formData.append('description', this.description);
        formData.append('pages', this.pages);
        formData.append('image', this.image);
        
        const token = localStorage.getItem('token');

        const response = await fetch('http://127.0.0.1:8000/api/books/add', {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          this.message = data.message;
          this.clearForm();
        } else {
          this.error = data.error || 'Failed to add book';
        }
      } catch (error) {
        console.error('Error:', error);
        this.error = 'An unexpected error occurred';
      }
    },

    clearForm() {
      this.name = '';
      this.publisher = '';
      this.isbn = '';
      this.category = '';
      this.subCategory = '';
      this.description = '';
      this.pages = 0;
      this.image = null;
      this.imagePreview = null;
      this.addedBy = '';
    },
  },
};
</script>

<style scoped>
.add-book-container {
  max-width: 400px;
  margin: 0 auto;
}

.add-book-form {
  display: grid;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.input-field {
  height: 20px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea.input-field {
  resize: vertical;
}

.image-preview {
  max-width: 100%;
  margin-top: 10px;
}

.add-book-button {
  background-color: #3498db;
  color: white;
  padding: 15px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-book-button:hover {
  background-color: #3498db;
}

.success-message {
  color: #4caf50;
}

.error-message {
  color: #f44336;
}
</style>
