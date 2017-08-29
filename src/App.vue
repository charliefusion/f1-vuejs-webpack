<template>
    <div id="app">
        <router-link to="/">Main</router-link>
        <router-link to="/alt">Alt</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    };
</script>

<style>
    .message {
        color:green;
    }
</style>