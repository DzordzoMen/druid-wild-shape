import { createRouter, createWebHistory } from 'vue-router';
import BeastInfo from '../views/BeastInfo.vue';
import BeastList from '../views/BeastList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition && to.name !== 'BeastInfo') {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
