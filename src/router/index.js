import Vue from 'vue';
import Router from 'vue-router';
import Main from '../components/Main';
import Drivers from '../components/Drivers';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            path: '/drivers',
            name: 'Drivers',
            component: Drivers
        }
    ]
});