<template>
    <h2> Bonjour, {{ hello }}</h2>
    <h3> Version 1.0.0</h3>
</template>

<script>
import { accountService } from '@/services/connection.service';

export default {
    name: "Home",
    created() {},
    mounted() {
        this.welcome();
    },
    data() {
        return {
            hello: ""
        };
    },
    props: {},
    methods: {
        welcome() {

            accountService.getThisAdmin().then(x => {
                this.hello = x.data.username
                console.log(x)
            });
        }
    },
};
</script>

<style lang="scss" scoped>
h2 {
    font-size: 9em;
    text-align: center;
    padding-top: 20vh;
}

h3 {
    font-size: 1em;
    text-align: center;
}
</style>