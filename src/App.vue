<template>
    <div id="app" class="container">
        <ul class="nav nav-pills">
            <router-link tag="li" to="/" exact-active-class="active"><a>Main</a></router-link>
            <router-link tag="li" to="/drivers" exact-active-class="active"><a>Drivers</a></router-link>
        </ul>
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