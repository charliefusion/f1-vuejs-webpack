import Vue from 'vue';
import Router from 'vue-router';
import Main from '../components/Main';
import Alt from '../components/Alt';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            path: '/alt',
            name: 'Alt',
            component: Alt
        }
    ]
});