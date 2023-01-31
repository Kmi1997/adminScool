<template>
    <div id="main">
        <div id="title">
            <h2> Connexion </h2>
        </div>
    
        <p v-if="unauthorized != null"> {{ unauthorized }}</p>
        <form id="connection" @submit.prevent="login">
            <label for="login"> Identifiant:</label>
            <input id="login" type="text" class="form-control" aria-describedby="username" v-model="user.username" />
            <label for="password"> Mot de passe: </label>
            <input id="password" class="form-control" type="password" aria-describedby="password" v-model="user.password" />
            <div class="form-group">
            </div>
            <button type="submit"> Connexion </button>
        </form>
    </div>
</template>

<script>
import { accountService } from '@/services/connection.service';

export default {
    name: 'Connection',
    mounted() {
        if(localStorage.getItem('token')) {
            this.$router.push('/');
        }
    },
    data() {
        return {
            user: {
                username: "",
                password: ""
            },
            unauthorized: ""
        }
    },
    methods: {
        login() {
            accountService.connection(this.user)
                .then(data => {

                    localStorage.setItem('token', data.data.token);
                    this.$router.push('/dashboard');
                })
                .catch(err => console.log(err.response.data.message))
        }
    }
};
</script>

<style lang="scss" scoped>
#main {
    z-index: 0;
    width: 100vw;
    height: 100vh;
    p {
        text-align: center;
        font-size: 1.3em;
        color: red;
    }
}

#title {
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
        font-size: 70px;
        margin-top: 15vh;
    }
}

#connection {
    margin-top: 13vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5em;
    input {
        width: 15vw;
        height: 5vh;
        margin-top: 1vw;
    }
    label {
        margin-top: 3vh
    }
    button {
        margin-top: 3vh;
        border: 1px solid black;
        width: 200px;
        font-size: 1.1em;
        text-align: center;
        background: linear-gradient(135deg, #ffbe0b 0%, #ff5100 100%);
        box-shadow: 1px 2px 1px grey;
        border-radius: 10px;
    }
}
</style>