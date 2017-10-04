<template>
    <div class="years form-inline">
        <label for="year-select">Year:</label>  
        <select id="year-select" class="form-control" v-model="year" @change="updateYear($event.target.value)">
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
        </select>
    </div>
</template>
<script>
    export default {
        name: 'years',
        data: function() {
            return {
                year: '2017'
            }
        },
        methods: {
            updateYear: function(year) {
                this.$emit('update', year);
            }
        },
        created() {
            this.updateYear(this.year);
        }
    }
</script>