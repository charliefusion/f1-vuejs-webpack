<template>
    <div class="drivers">
        <h3>{{ message }}</h3>
        <div class="row">
            <div class="col-xs-2 form-inline">
                <label for="year-select">Year:</label>  
                <select id="year-select" class="form-control" v-model="year" v-on:change="getData">
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                </select>
            </div>
        </div>
        <div v-if="loading">Loading...</div>
        <table class="table table-striped" v-else>
            <thead>
                <th>Name</th>
                <th>Code</th>
                <th>Nationality</th>
            </thead>
            <tbody>
                <tr v-for="driver in drivers">
                    <td>{{driver.givenName + ' ' + driver.familyName}}</td>
                    <td>{{driver.code}}</td>
                    <td>{{driver.nationality}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'drivers',
        data: () => ({
            message: 'Drivers',
            drivers: [],
            year: '2017',
            loading: true
        }),
        methods: {
            getData() {
                this.loading = true;
                this.$http.get('http://ergast.com/api/f1/' + this.year + '/drivers.json').then(response => {
                    console.log(response);
                    this.drivers = response.body.MRData.DriverTable.Drivers;
                    this.loading = false;
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
    h3 {
        font-family: sans-serif;
    }
</style>