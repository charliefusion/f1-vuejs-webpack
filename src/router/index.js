import Vue from 'vue';
import Router from 'vue-router';
import Teams from '../components/Teams';
import Team from '../components/Team';
import Drivers from '../components/Drivers';
import Driver from '../components/Driver';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/teams',
            name: 'Teams',
            component: Teams
        },
        {
            path: '/teams/:year/:id',
            name: 'Team',
            component: Team,
            props: true
        },
        {
            path: '/drivers',
            name: 'Drivers',
            component: Drivers
        },
        {
            path: '/drivers/:year/:id',
            name: 'Driver',
            component: Driver,
            props: true
        },
        {   path: '*',
            redirect: '/teams' 
        }
    ]
});