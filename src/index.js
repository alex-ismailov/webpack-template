import './js/common.js';
import './assets/css/main.css';
import './assets/scss/main.scss';

window.Vue = require('vue');
// Vue components (for use in html)
Vue.component('example-component', require('./components/Example.vue').default);
import store from './store';

// Vue init
const app = new Vue({
  data () {
    return {
      showExampleComponent: false,
    }
  },
  store,
  el: '#app'
});
