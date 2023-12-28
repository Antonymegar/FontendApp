import { createRouter, createWebHistory } from 'vue-router';
import RegisterUser from '../components/RegisterUser.vue';
import AddBook from '../components/AddBook.vue';
import RequestBookLoan from '../components/RequestBookLoan.vue';
import ApproveBookLoan from '../components/ApproveBookLoan.vue';
import ExtendBookLoan from '../components/ExtendBookLoan.vue';
import ReceiveBookedLoaned from '../components/ReceiveBookedLoaned.vue';
import AccountLogIn from '../components/AccountLogIn.vue';
import BookList from '../components/BookList.vue';
import MyBooks from '../components/MyBooks.vue'; 
import LoanedBooks from '../components/LoanedBooks.vue';

const routes = [
  { path: '/register', component: RegisterUser, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/add-book', component: AddBook, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/request-loan/:id', name: 'request-loan',component: RequestBookLoan, meta: { requiresAuth: true, role: 'user' }},
  
  { path: '/approve-loan', component: ApproveBookLoan, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/extend-loan/:id',name: 'extend-loan', component: ExtendBookLoan, meta: { requiresAuth: true, role: 'user' } },
  { path: '/receive-book/:id', name:'receive-book', component: ReceiveBookedLoaned, meta: { requiresAuth: true, role: 'admin' } },
  {path: '/loan-request', component:LoanedBooks, meta: { requiresAuth: true, role: 'admin' }},
  { path: '/login', component: AccountLogIn },
  { path: '/books', component: BookList},
  { path: '/mybooks', component: MyBooks, meta: { requiresAuth: true, role: 'user' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole'); 

  if (to.meta.requiresAuth) {
    if (isAuthenticated) {
      if (to.meta.role && to.meta.role !== userRole) { 
        next('/login');
      } else {
        next();
      }
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
