<template>
    <div id="app">
        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">F1 Data App</a>
                </div>
                <div class="collapse navbar-collapse" id="navbar">
                    <ul class="nav navbar-nav">
                        <router-link tag="li" to="/teams" exact-active-class="active" active-class="active"><a>Teams</a></router-link>
                        <router-link tag="li" to="/drivers" exact-active-class="active" active-class="active"><a>Drivers</a></router-link>
                        <router-link tag="li" to="/races" exact-active-class="active" active-class="active"><a>Races</a></router-link>
                        <li class="navbar-form">
                            <years @update="updateYear"></years>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <main class="container" id="main">
            <router-view :year="year"></router-view>
        </main>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Years from './components/Years.vue';
    Vue.component(Years.name, Years);
    export default {
        name: 'app',
        data: () => ({
            year: ''
        }),
        methods: {
            updateYear: function(year) {
                this.year = year;
            }
        }
    };
</script>

<style>
</style>