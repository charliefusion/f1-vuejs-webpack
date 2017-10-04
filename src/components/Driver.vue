<template>
    <div v-if="loading">Loading...</div>
    <div class="driver" v-else>
        <h1 class="driver-name">{{driver.Driver.givenName}}&nbsp;{{driver.Driver.familyName}} &mdash; {{year}} Season</h1>
        <strong>Nationality:</strong> {{driver.Driver.nationality}}   <br>
        <strong>Teams:</strong> 
        <span v-for="(team, index) in driver.Constructors">
            <router-link :to="'/teams/' + year + '/' + team.constructorId"><a>{{team.name}}</a></router-link>
            <span v-if="index+1 < driver.Constructors.length">, </span>
        </span><br>
        <strong>Birthday:</strong> {{driver.Driver.dateOfBirth}}<br>
        <a :href="driver.Driver.url" target="_blank" class="btn btn-default">Wikipedia Bio</a>

        <ul>
            <li>{{year}} Wins: {{driver.wins}}</li>
            <li>Points: {{driver.points}}</li>
            <li>WDC Position: {{driver.position}}</li>
        </ul>

        <div v-if="loadingRaces">Loading race data...</div>
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
                        <td>{{race.raceName}}</td>
                        <td>{{race.Results[0].Constructor.name}}</td>
                        <td>{{race.Results[0].grid}}</td>
                        <td>{{race.Results[0].position}}</td>
                    </tr>
                </tbody>
            </table>
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
            races: []
        }),
        methods: {
            getData() {
                this.loading = true;
                this.loadingRaces = true;
                this.$http.get('http://ergast.com/api/f1/' + this.year + '/drivers/' + this.id + '/driverStandings.json').then(response => {
                    console.log('driver response', response);
                    this.loading = false;
                    this.driver = response.body.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
                }, response => {
                    console.log('driver api error', response);
                });
                this.$http.get('http://ergast.com/api/f1/' + this.year + '/drivers/' + this.id + '/results.json').then(response => {
                    console.log('races response', response);
                    this.loadingRaces = false;
                    this.races = response.body.MRData.RaceTable.Races;
                }, response => {
                    console.log('races api error', response);
                });
            }
        },
        created() {
            this.getData();
        },
        watch: {
            year: function(value) {
                this.getData();
            }
        }
    }
</script>

<style>
</style>