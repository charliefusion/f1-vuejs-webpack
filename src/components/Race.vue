<template>
    <div v-if="loading">Loading...</div>
    <div class="race" v-else>
        <h1 class="race-name">{{race.raceName}} &mdash; {{year}} Season</h1>
    </div>
</template>
<script>
    export default {
        name: 'vue',
        props: ['id', 'year'],
        data: () => ({
            loading: false,
            race: {}
        }),
        methods: {
            getRaceInfo() {
                this.loading = true;
                this.$http.get('http://ergast.com/api/f1/' + this.year + '/' + this.id + '/results.json').then(response => {
                    this.loading = false;
                    this.race = response.body.MRData.RaceTable.Races[0];
                }, response => {
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