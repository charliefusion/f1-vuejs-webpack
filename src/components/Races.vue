<template>
    <div class="races">
        <h1>Races &mdash; {{year}} Season</h1>
        <div v-if="loading">Loading...</div>
        <table class="table table-striped" v-else>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Circuit</th>
                    <th>Location</th>
                    <th>Winning Driver</th>
                    <th>Winning Team</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="race in races">
                    <td><router-link :to="'/races/' + race.round"><a>{{race.raceName}}</a></router-link></td>
                    <td>{{race.date}}</td>
                    <td>{{race.Circuit.circuitName}}</td>
                    <td>{{race.Circuit.Location.locality}}, {{race.Circuit.Location.country}}</td>
                    <td><router-link :to="'/drivers/' + race.Results[0].Driver.driverId"><a>{{race.Results[0].Driver.givenName}} {{race.Results[0].Driver.familyName}}</a></router-link></td>
                    <td><router-link :to="'/teams/' + race.Results[0].Constructor.constructorId"><a>{{race.Results[0].Constructor.name}}</a></router-link></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        name: 'races',
        props: ['year'],
        data: () => ({
            loading: true,
            races: []
        }),
        methods: {
            getRaces() {
                this.loading = true;
                this.$http.get('http://ergast.com/api/f1/' + this.year + '/results/1.json').then(response => {
                    this.loading = false;
                    this.races = response.body.MRData.RaceTable.Races;
                }, response => {
                    console.log('error', response);
                });
            }
        },
        mounted() {
            if (this.year !== '') {
                this.getRaces();
            }
        },
        watch: {
            year: function(value) {
                this.getRaces();
            }
        }
    };
</script>