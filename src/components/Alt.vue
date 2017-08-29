<template>
    <div class="alt">
        <h3>{{ message }}</h3>
    </div>
</template>

<script>
    export default {
        name: 'alt',
        data () {
            return {
                message: 'Hello World'
            }
        }
    }
</script>

<style>
    h3 {
        font-family: sans-serif;
    }
</style>