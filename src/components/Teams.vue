<template>
    <div class="teams">
        <div class="message">Current value is: {{ count }}</div> 
        <a href="#" v-on:click.prevent="increment" class="btn btn-default">Increment</a>
        <div v-if="seen">
            <p>I have a thing!</p>
        </div>
        <div v-else>
            <p>I don't have a thing..</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'teams',
        data: () => ({
            count: 0,
            seen: true
        }),
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