import Vue from 'vue';
import Router from 'vue-router';
import Teams from '../components/Teams';
import Team from '../components/Team';
import Drivers from '../components/Drivers';
import Driver from '../components/Driver';
import Races from '../components/Races';
import Race from '../components/Race';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/teams',
            name: 'Teams',
            component: Teams
        },
        {
            path: '/teams/:id',
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
            path: '/drivers/:id',
            name: 'Driver',
            component: Driver,
            props: true
        },
        {
            path: '/races',
            name: 'Races',
            component: Races
        },
        {
            path: '/races/:id',
            name: 'Race',
            component: Race,
            props: true
        },
        {   path: '*',
            redirect: '/teams' 
        }
    ]
});