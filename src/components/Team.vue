<template>
    <div v-if="loading">Loading...</div>
    <div class="team" v-else>
        <h1>{{ id }} &mdash; {{ year }} Season</h1>
    </div>
</template>
<script>
    export default {
        name: 'team',
        props: ['id', 'year'],
        data: () => ({
            loading: false
        }),
        watch: {
            year: function(value) {
                // this.getData();
            }
        }
    }
</script>

<style>
</style>