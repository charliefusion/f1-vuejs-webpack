<template>
    <div class="teams">
        <h1>{{ message }}</h1>
        <div v-if="loading">Loading...</div>
        <table class="table table-striped" v-else>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Nationality</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="team in teams">
                    <td><router-link :to="'/teams/2017/' + team.Constructor.constructorId"><a>{{team.Constructor.name}}</a></router-link></td>
                    <td>{{team.Constructor.nationality}}</td>
                    <td>{{team.points}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'teams',
        data: () => ({
            message: 'Teams',
            teams: [],
            loading: true
        }),
        methods: {
            getData() {
                this.loading = true;
                this.$http.get('http://ergast.com/api/f1/2014/constructorStandings.json').then(response => {
                    console.log('response', response);
                    this.loading = false;
                    this.teams = response.body.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
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