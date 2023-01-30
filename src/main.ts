import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VTooltip } from 'floating-vue';

import App from './App.vue';
import router from './router';

import './assets/main.scss';
import 'floating-vue/dist/style.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.directive('tooltip', VTooltip);

app.mount('#app');
