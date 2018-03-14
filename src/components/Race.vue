<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">An error has occurred. No race data is available.</div>
    <div class="race" v-else>
        <h1 class="race-name">{{race.raceName}} &mdash; {{year}} Season</h1>
        <p>
            <strong>Date:</strong> {{race.date}} <br>
            <strong>Circuit:</strong> {{race.Circuit.circuitName}} <br>
            <strong>Location:</strong> {{race.Circuit.Location.locality}}, {{race.Circuit.Location.country}}
        </p>
        <p>
            <a :href="race.url" target="_blank" class="btn btn-default">Race Wikipedia Bio</a> 
            <a :href="race.Circuit.url" target="_blank" class="btn btn-default">Circuit Wikipedia Bio</a> 
            <a :href="`https://www.google.com/maps/search/?api=1&query=${race.Circuit.Location.lat},${race.Circuit.Location.long}`" target="_blank" class="btn btn-default">View on Google Maps</a>
        </p>
        <h2>Results</h2>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Driver</th>
                    <th>Team</th>
                    <th>Qualified</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="driver in race.Results">
                    <td>{{driver.position}}</td>
                    <td><router-link :to="'/drivers/' + driver.Driver.driverId"><a>{{driver.Driver.givenName}} {{driver.Driver.familyName}}</a></router-link></td>
                    <td><router-link :to="'/teams/' + driver.Constructor.constructorId"><a>{{driver.Constructor.name}}</a></router-link></td>
                    <td>{{driver.grid}}</td>
                    <td>{{driver.laps}} laps &ndash; {{driver.status}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        name: 'vue',
        props: ['id', 'year'],
        data: () => ({
            loading: true,
            race: {},
            error: false
        }),
        methods: {
            getRaceInfo() {
                this.loading = true;
                this.error = false;
                this.$http.get('//ergast.com/api/f1/' + this.year + '/' + this.id + '/results.json').then(response => {
                    this.loading = false;
                    if (response.body.MRData.RaceTable.Races.length > 0) {
                        this.race = response.body.MRData.RaceTable.Races[0];
                    } else {
                        this.error = true;
                    }
                }, response => {
                    this.loading = false;
                    this.error = true;
                    console.log('error', response);
                });
            }
        },
        mounted() {
            if (this.year !== '') {
                this.getRaceInfo();
            }
        },
        watch: {
            year: function(value) {
                this.getRaceInfo();
            }
        }
    };
</script>