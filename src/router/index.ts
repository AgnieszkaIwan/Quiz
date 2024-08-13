import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Quiz from '@/views/QuizView.vue'
import Summary from '@/views/SummaryView.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/quiz', name: 'Quiz', component: Quiz },
  { path: '/summary', name: 'Summary', component: Summary }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;