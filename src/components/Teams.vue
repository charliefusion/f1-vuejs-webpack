<template>
    <div class="teams">
        <h1>Teams &mdash; {{year}} Season</h1>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">An error has occurred. No team data is available.</div>
        <table class="table table-striped" v-else>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Nationality</th>
                    <th>Points</th>
                    <th>Wins</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="team in teams">
                    <td><router-link :to="'/teams/' + team.Constructor.constructorId"><a>{{team.Constructor.name}}</a></router-link></td>
                    <td>{{team.Constructor.nationality}}</td>
                    <td>{{team.points}}</td>
                    <td>{{team.wins}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'teams',
        props: ['year'],
        data: () => ({
            teams: [],
            loading: true,
            error: false
        }),
        methods: {
            getData() {
                this.loading = true;
                this.error = false;
                this.$http.get('//ergast.com/api/f1/' + this.year + '/constructorStandings.json').then(response => {
                    this.loading = false;
                    if (response.body.MRData.StandingsTable.StandingsLists.length > 0) {
                        this.teams = response.body.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
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