<template>
    <div class="main">
        <div class="message">Current value is: {{ count }}</div> 
        <a href="#" @click.prevent="increment">Increment</a>
    </div>
</template>

<script>
    export default {
        name: 'main',
        data() {
            return {
                count: 0
            };
        },
        methods: {
            increment() {
                this.count++;
            }
        }
    }
</script>

<style>
    .message {
        color:green;
    }
</style>