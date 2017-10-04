require('jquery/dist/jquery.min.js');
require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/js/bootstrap.min.js');

import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';

Vue.use(VueResource);

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});