import { createRouter, createWebHistory } from 'vue-router';
import BeastInfo from '../views/BeastInfo.vue';
import BeastList from '../views/BeastList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'BeastList',
      component: BeastList,
    },
    {
      path: '/beast/:beastName',
      name: 'BeastInfo',
      component: BeastInfo,
    },
  ],
});

export default router;
