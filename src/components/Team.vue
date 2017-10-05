<template>
    <div v-if="loading">Loading...</div>
    <div class="team" v-else>
        <h1>{{ team.Constructor.name }} &mdash; {{ year }} Season</h1>
        <strong>Nationality:</strong> {{team.Constructor.nationality}}   <br>
        <a :href="team.Constructor.url" target="_blank" class="btn btn-default">Wikipedia Bio</a>

        <ul>
            <li>{{year}} Wins: {{team.wins}}</li>
            <li>Points: {{team.points}}</li>
            <li>WCC Position: {{team.position}}</li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'team',
        props: ['id', 'year'],
        data: () => ({
            loading: true,
            team: {}
        }),
        methods: {
            getData() {
                this.loading = true;
                this.$http.get('http://ergast.com/api/f1/' + this.year + '/constructors/' + this.id + '/constructorStandings.json').then(response => {
                    this.loading = false;
                    this.team = response.body.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0];
                }, response => {
                    console.log('team details error', response);
                });
            }
        },
        created() {
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