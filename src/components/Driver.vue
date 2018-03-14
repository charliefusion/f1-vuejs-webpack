<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">An error has occurred. No driver data is available.</div>
        <div class="driver" v-else>
            <h1 class="driver-name">{{driver.Driver.givenName}}&nbsp;{{driver.Driver.familyName}} &mdash; {{year}} Season</h1>
            <p>
                <strong>Nationality:</strong> {{driver.Driver.nationality}} <br>
                <strong>Teams:</strong> 
                    <span v-for="(team, index) in driver.Constructors">
                        <router-link :to="'/teams/' + team.constructorId"><a>{{team.name}}</a></router-link><span v-if="index+1 < driver.Constructors.length">, </span>
                    </span> <br>
                <strong>Birthday:</strong> {{driver.Driver.dateOfBirth}} <br>
            </p>
            <p><a :href="driver.Driver.url" target="_blank" class="btn btn-default">Wikipedia Bio</a></p>

            <ul>
                <li><strong>{{year}} Wins:</strong> {{driver.wins}}</li>
                <li><strong>Points:</strong> {{driver.points}}</li>
                <li><strong>WDC Position:</strong> {{driver.position}}</li>
            </ul>
        </div>

        <div>
            <h2>Results</h2>
            <div v-if="loadingRaces">Loading race data...</div>
            <div v-else-if="errorRaces">An error has occurred. No race data is available.</div>
            <div v-else>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>Team</th> 
                            <th>Qualified</th> 
                            <th>Finished</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="race in races" :class="{ 'success': race.Results[0].position === '1' }">
                            <td>{{race.round}}</td>
                            <td><router-link :to="'/races/' + race.round"><a>{{race.raceName}}</a></router-link></td>
                            <td><router-link :to="'/teams/' + race.Results[0].Constructor.constructorId"><a>{{race.Results[0].Constructor.name}}</a></router-link></td>
                            <td>{{race.Results[0].grid}}</td>
                            <td>{{race.Results[0].position}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'driver',
        props: ['id', 'year'],
        data: () => ({
            loading: true,
            loadingRaces: true,
            driver: {},
            races: [],
            error: false,
            errorRaces: false
        }),
        methods: {
            getData() {
                this.loading = true;
                this.loadingRaces = true;
                this.error = false;
                this.errorRaces = false;
                this.$http.get('//ergast.com/api/f1/' + this.year + '/drivers/' + this.id + '/driverStandings.json').then(response => {
                    this.loading = false;
                    if (response.body.MRData.StandingsTable.StandingsLists.length > 0) {
                        this.driver = response.body.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
                    } else {
                        this.error = true;
                    }
                }, response => {
                    this.loading = false;
                    this.error = true;
                    console.log('driver api error', response);
                });
                this.$http.get('//ergast.com/api/f1/' + this.year + '/drivers/' + this.id + '/results.json').then(response => {
                    this.loadingRaces = false;
                    if (response.body.MRData.RaceTable.Races.length > 0) {
                        this.races = response.body.MRData.RaceTable.Races;
                    } else {
                        this.errorRaces = true;
                    }
                }, response => {
                    this.loadingRaces = false;
                    this.errorRaces = true;
                    console.log('races api error', response);
                });
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
</style>