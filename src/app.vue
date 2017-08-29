<template>
    <div class="message">{{ msg }}</div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'Hello there'
            };
        }
    };
</script>

<style>
    .message {
        color:green;
    }
</style>