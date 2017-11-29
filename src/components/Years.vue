<template>
    <div class="years form-inline">
        <label for="year-select">Year:</label>  
        <select id="year-select" class="form-control" v-model="year" @change="updateYear($event.target.value)">
            <option v-for="yearValue in years" :value="yearValue">{{yearValue}}</option>
        </select>
    </div>
</template>
<script>
    export default {
        name: 'years',
        data() {
            return {
                year: 2017
            }
        },
        computed: {
            years() {
                var currYear = new Date().getFullYear();
                var yearsArray = [];
                for (var i=0; i < 10; i++) {
                  yearsArray.push(currYear);
                  currYear--;
                }
                return yearsArray;
            }
        },
        methods: {
            updateYear: function(year) {
                this.$emit('update', year);
            }
        },
        mounted() {
            this.year = new Date().getFullYear();
            this.updateYear(this.year);
        }
    };
</script>