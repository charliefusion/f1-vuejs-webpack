import Vue from 'vue';
import Router from 'vue-router';
import Teams from '../components/Teams';
import Drivers from '../components/Drivers';
import Driver from '../components/Driver';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Teams',
            component: Teams
        },
        {
            path: '/drivers',
            name: 'Drivers',
            component: Drivers
        },
        {
            path: '/driver/:year/:id',
            name: 'Driver',
            component: Driver,
            props: true
        }
    ]
});