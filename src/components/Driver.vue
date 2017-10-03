<template>
    <div v-if="loading">Loading...</div>
    <div class="driver" v-else>
        <h1 class="driver-name">{{driver.Driver.givenName}}&nbsp;{{driver.Driver.familyName}} &mdash; {{year}} Season</h1>
        <strong>Country:</strong> {{driver.Driver.nationality}}   <br>
        <strong>Teams:</strong> <span v-for="(team, index) in driver.Constructors">{{team.name}}<span v-if="index+1 < driver.Constructors.length">, </span></span><br>
        <strong>Birth:</strong> {{driver.Driver.dateOfBirth}}<br>
        <a :href="driver.Driver.url" target="_blank" class="view-switch">Biography</a>

        <ul>
            <li>{{year}} Wins: {{driver.wins}}</li>
            <li>Points: {{driver.points}}</li>
            <li>WDC Position: {{driver.position}}</li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'driver',
        props: ['id', 'year'],
        data: () => ({
            loading: true,
            driver: {}
        }),
        methods: {
            getData() {
                this.loading = true;
                this.$http.get('http://ergast.com/api/f1/' + this.year + '/drivers/' + this.id + '/driverStandings.json').then(response => {
                    console.log('response', response);
                    this.loading = false;
                    this.driver = response.body.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
                }, response => {
                    console.log('error', response);
                });
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style>
</style>