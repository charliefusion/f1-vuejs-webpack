<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">An error has occurred. No team data is available.</div>
        <div class="team" v-else>
            <h1>{{ team.Constructor.name }} &mdash; {{ year }} Season</h1>
            <p><strong>Nationality:</strong> {{team.Constructor.nationality}}</p>
            <p><a :href="team.Constructor.url" target="_blank" class="btn btn-default">Wikipedia Bio</a></p>

            <ul>
                <li>{{year}} Wins: {{team.wins}}</li>
                <li>Points: {{team.points}}</li>
                <li>WCC Position: {{team.position}}</li>
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
                            <th>Race</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Driver</th>
                            <th>Qualified</th>
                            <th>Finished</th>
                        </tr>
                    </thead>
                    <tbody v-for="race in races">
                        <tr>
                            <td rowspan="2" class="tall-col"><router-link :to="'/races/' + race.round"><a>{{race.raceName}}</a></router-link></td>
                            <td rowspan="2" class="tall-col">{{race.Circuit.Location.locality + ', ' + race.Circuit.Location.country}}</td>
                            <td rowspan="2" class="tall-col">{{race.date}}</td>
                            <td class="active"><router-link :to="'/drivers/' + race.Results[0].Driver.driverId"><a>{{race.Results[0].Driver.givenName + ' ' + race.Results[0].Driver.familyName}}</a></router-link></td>
                            <td class="active">{{race.Results[0].grid}}</td>
                            <td class="active" :class="{ 'success': race.Results[0].position === '1' }">{{race.Results[0].position}}</td>
                        </tr>
                        <tr class="active">
                            <td><router-link :to="'/drivers/' + race.Results[1].Driver.driverId"><a>{{race.Results[1].Driver.givenName + ' ' + race.Results[1].Driver.familyName}}</a></router-link></td>
                            <td>{{race.Results[1].grid}}</td>
                            <td :class="{ 'success': race.Results[1].position === '1' }">{{race.Results[1].position}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'team',
        props: ['id', 'year'],
        data: () => ({
            loading: true,
            loadingRaces: true,
            team: {},
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
                this.$http.get('//ergast.com/api/f1/' + this.year + '/constructors/' + this.id + '/constructorStandings.json').then(response => {
                    this.loading = false;
                    if (response.body.MRData.StandingsTable.StandingsLists.length > 0) {
                        this.team = response.body.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0];
                    } else {
                        this.error = true;
                    }
                }, response => {
                    this.loading = false;
                    this.error = true;
                    console.log('team details error', response);
                });
                this.$http.get('//ergast.com/api/f1/' + this.year + '/constructors/' + this.id + '/results.json').then(response => {
                    this.loadingRaces = false;
                    if (response.body.MRData.RaceTable.Races.length > 0) {
                        this.races = response.body.MRData.RaceTable.Races;
                    } else {
                        this.errorRaces = true;
                    }
                }, response => {
                    this.loadingRaces = false;
                    this.errorRaces = true;
                    console.log('team drivers error', response);
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
    .table>tbody>tr>td.tall-col {
        vertical-align: middle;
    }
</style>