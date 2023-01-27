<template>
    <nav id="app-bar" class="navbar navbar-expand-sm">
        <router-link class="nav-link" to="/">
        <a id="title" class="text-dark navbar-brand">s'Cool Family</a>
</router-link>
        <button :disabled="!connected" class="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
    
        <div class="collapse navbar-collapse" id="navbarSupportedContent" v-if="connected">
            <ul class="navbar-nav text-center">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/stages">Stages <img class="material-symbols-outlined" src="../assets/edit.png"></router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/inscriptions">Inscriptions<img class="material-symbols-outlined" src="../assets/boy.png"></router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/admins">Administrateurs <img class="material-symbols-outlined" src="../assets/keys.png"></router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/parametres"> Paramètres <img class="material-symbols-outlined" src="../assets/settings.png"></router-link>
                </li>
                <li class="nav-item">
                    <div class="nav-link logout" @click="logout">Logout <img class="material-symbols-outlined" src="../assets/logout.png"></div>
                </li>
            </ul>
        </div>
    </nav>
    <div id="container">
        <router-view></router-view>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    data() {
        return {
            connected: false
        }
    },

    name: "Layout-view",

    mounted() {
        this.isConnected();
    },

    updated() {
        this.isConnected()
    },

    methods: {
        isConnected() {
            if (localStorage.getItem('token')) {
                this.connected = true;
            } else {
                this.connected = false;
            };
        },

        logout() {
            localStorage.removeItem('token');
            this.$router.push('/login');
        }
    }
};
</script>

<style lang="scss">
body {
    margin: 0;
}

#app-bar {
    :first-child {
        text-decoration: none;
    }
    div ul {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-end;
        width: 100%;
    }
    z-index: 99;
    position: fixed;
    top: 0;
    width: 100vw;
    height: 10vh;
    background: linear-gradient(135deg, #ffbe0b 0%, #ff5100 100%);
    box-shadow: 0px 3px 5px grey;
    #title {
        margin-left: 2vw;
        font-size: 2em;
    }
}

#container {
    margin-top: 10vh;
}

@font-face {
    font-family: 'Grunge';
    src: url('../assets/American_Grunge.ttf') format("opentype");
}

#title,
h2 {
    font-family: 'Grunge';
}

:not(h2):not(#title) {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

@media screen and (max-width: 576px) {
    #app-bar {
        div ul {
            width: 50%;
            margin: 5vh auto auto auto;
            li {
                margin-left: 2vh;
                text-align: center;
            }
        }
    }
}

.material-symbols-outlined {
    width: 5vh;
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48
}

.logout {
    cursor: pointer;
}
</style>