<template>
    <div class="drivers">
        <h1>Drivers &mdash; {{year}} Season</h1>
        <div v-if="loading">Loading...</div>
        <table class="table table-striped" v-else>
            <thead>
                <th v-on:click="sortDrivers('familyName')" :class="{'active': sort === 'familyName'}">Name <span class="caret" :class="{ 'reversed': reversed }" v-if="sort === 'familyName'"></span></th>
                <th v-on:click="sortDrivers('Constructors')" :class="{'active': sort === 'Constructors'}">Teams <span class="caret" :class="{ 'reversed': reversed }" v-if="sort === 'Constructors'"></span></th>
                <th v-on:click="sortDrivers('nationality')" :class="{'active': sort === 'nationality'}">Nationality <span class="caret" :class="{ 'reversed': reversed }" v-if="sort === 'nationality'"></span></th>
                <th v-on:click="sortDrivers('points')" :class="{'active': sort === 'points'}">Points <span class="caret" :class="{ 'reversed': reversed }" v-if="sort === 'points'"></span></th>
            </thead>
            <tbody>
                <tr v-for="driver in drivers">
                    <td><router-link :to="'/drivers/' + driver.Driver.driverId"><a>{{driver.Driver.givenName + ' ' + driver.Driver.familyName}}</a></router-link></td>
                    <td>
                        <span v-for="(team, index) in driver.Constructors">
                            <router-link :to="'/teams/' + year + '/' + team.constructorId"><a>{{team.name}}</a></router-link>
                            <span v-if="index+1 < driver.Constructors.length">, </span>
                        </span>
                    </td>
                    <td>{{driver.Driver.nationality}}</td>
                    <td>{{driver.points}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'drivers',
        props: ['year'],
        data: () => ({
            drivers: [],
            loading: true,
            sort: 'points',
            reversed: false
        }),
        methods: {
            getData() {
                this.loading = true;
                this.$http.get('http://ergast.com/api/f1/' + this.year + '/driverStandings.json').then(response => {
                    this.drivers = response.body.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                    this.loading = false;
                    this.sort = 'points';
                    this.reversed = false;
                }, response => {
                    console.log('error', response);
                });
            },
            sortDrivers(property) {
                let first, second;
                if (this.sort === property) {
                    this.drivers.reverse();
                    this.reversed = !this.reversed;
                } else {
                    this.sort = property;
                    this.reversed = false;
                    this.drivers.sort((a, b) => {
                        if (property === 'points') {
                            first = parseInt(a[property], 10);
                            second = parseInt(b[property], 10);
                        } else if (property === 'Constructors') {
                            first = a.Constructors[0].name;
                            second = b.Constructors[0].name;
                        } else {
                            first = a.Driver[property];
                            second = b.Driver[property];
                        }
                        if (first < second)
                            return -1;
                        if (first > second)
                            return 1;
                        return 0;
                    });
                    if (property === 'points') {
                        this.drivers.reverse();
                    }
                }
            }
        },
        mounted() {
            if (this.year !== '') {
                this.getData();
            }
        },
        watch: {
            year: function(value) {
                this.getData();
            }
        }
    };
</script>

<style>
    th {
        cursor:pointer;
    }
    th.active {
        color:#428bca;
    }
    .caret.reversed {
        transform: rotate(180deg);
    }
</style>