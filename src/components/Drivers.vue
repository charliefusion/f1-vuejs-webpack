<template>
    <div class="drivers">
        <h1>Drivers &mdash; {{year}} Season</h1>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">An error has occurred. No driver data is available.</div>
        <table class="table table-striped" v-else>
            <thead>
                <tr>
                    <th v-on:click="sortDrivers('familyName')" :class="{'active': sort === 'familyName'}">Name <span class="caret" :class="{ 'reversed': reversed }" v-if="sort === 'familyName'"></span></th>
                    <th v-on:click="sortDrivers('Constructors')" :class="{'active': sort === 'Constructors'}">Teams <span class="caret" :class="{ 'reversed': reversed }" v-if="sort === 'Constructors'"></span></th>
                    <th v-on:click="sortDrivers('nationality')" :class="{'active': sort === 'nationality'}">Nationality <span class="caret" :class="{ 'reversed': reversed }" v-if="sort === 'nationality'"></span></th>
                    <th v-on:click="sortDrivers('points')" :class="{'active': sort === 'points'}">Points <span class="caret" :class="{ 'reversed': reversed }" v-if="sort === 'points'"></span></th>
                    <th v-on:click="sortDrivers('wins')" :class="{'active': sort === 'wins'}">Wins <span class="caret" :class="{ 'reversed': reversed }" v-if="sort === 'wins'"></span></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="driver in drivers">
                    <td><router-link :to="'/drivers/' + driver.Driver.driverId"><a>{{driver.Driver.givenName + ' ' + driver.Driver.familyName}}</a></router-link></td>
                    <td>
                        <span v-for="(team, index) in driver.Constructors">
                            <router-link :to="'/teams/' + year + '/' + team.constructorId"><a>{{team.name}}</a></router-link><span v-if="index+1 < driver.Constructors.length">, </span>
                        </span>
                    </td>
                    <td>{{driver.Driver.nationality}}</td>
                    <td>{{driver.points}}</td>
                    <td>{{driver.wins}}</td>
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
            reversed: false,
            error: false
        }),
        methods: {
            getData() {
                this.loading = true;
                this.error = false;
                this.$http.get('//ergast.com/api/f1/' + this.year + '/driverStandings.json').then(response => {
                    this.loading = false;
                    if (response.body.MRData.StandingsTable.StandingsLists.length > 0) {
                        this.drivers = response.body.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                        this.sort = 'points';
                        this.reversed = false;
                    } else {
                        this.error = true;
                    }
                }, response => {
                    this.loading = false;
                    this.error = true;
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
                        if (property === 'points' || property === 'wins') {
                            first = parseInt(a[property], 10);
                            second = parseInt(b[property], 10);
                        } else if (property === 'Constructors') {
                            first = a.Constructors[0].name;
                            second = b.Constructors[0].name;
                        } else {
                            first = a.Driver[property].toLowerCase();
                            second = b.Driver[property].toLowerCase();
                        }
                        if (first < second)
                            return -1;
                        if (first > second)
                            return 1;
                        return 0;
                    });
                    if (property === 'points' || property === 'wins') {
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

<style scoped>
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