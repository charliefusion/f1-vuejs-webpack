<template>
    <div class="teams">
        <h1>Teams &mdash; {{year}} Season</h1>
        <div v-if="loading">Loading...</div>
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
            loading: true
        }),
        methods: {
            getData() {
                this.loading = true;
                this.$http.get('http://ergast.com/api/f1/' + this.year + '/constructorStandings.json').then(response => {
                    this.loading = false;
                    this.teams = response.body.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
                }, response => {
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