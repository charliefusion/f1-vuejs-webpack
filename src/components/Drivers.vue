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
                <th v-on:click="sortDrivers('familyName')">Name</th>
                <th>Code</th>
                <th v-on:click="sortDrivers('nationality')">Nationality</th>
                <th v-on:click="sortDrivers('points')">Points</th>
            </thead>
            <tbody>
                <tr v-for="driver in drivers">
                    <td>{{driver.Driver.givenName + ' ' + driver.Driver.familyName}}</td>
                    <td>{{driver.Driver.code}}</td>
                    <td>{{driver.Driver.nationality}}</td>
                    <td>{{driver.points}}</td>
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
                this.$http.get('http://ergast.com/api/f1/' + this.year + '/driverStandings.json').then(response => {
                    console.log(response);
                    this.drivers = response.body.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                    this.loading = false;
                }, response => {
                    console.log('error', response);
                });
            },
            sortDrivers(property) {
                this.drivers.sort((a, b) => {
                    let first = (property !== 'points') ? a.Driver[property] : parseInt(a[property], 10);
                    let second = (property !== 'points') ? b.Driver[property] : parseInt(b[property], 10);
                    if (first < second)
                        return -1;
                    if (first > second)
                        return 1;
                    return 0;
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