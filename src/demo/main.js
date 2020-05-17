//Imports
import App from './App.vue';
import viewer from '../main.js';
import Vue from 'vue';

Vue.use(viewer);

//Vue instance
new Vue({
  el: '#app',
  render: h => h(App)
});
