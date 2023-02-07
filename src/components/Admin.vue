<template>
    <table class="table table-xl table-hover table-group-divider table-bordered">
        <thead>
            <tr>
                <th scope="col">Identifiant</th>
                <th scope="col">Accès complet</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="info in tabDatas">
                <th scope="row">{{ info.username }}</th>
                <td>{{ info.superRoot }}</td>
                <td :id="info.id"><img @click="deleting($event)" src="../assets/delete.png" /> <img @click="updating($event)" src="../assets/update.png" /></td>
            </tr>
        </tbody>
    </table>
    
    <div id="mainError" v-if="tabErrors.length > 0 && showCardError">
        <div id="error">
            <p v-for="error in tabErrors"> {{ error }}</p>
            <button @click="closeError" class="btn btn-secondary">Quitter</button>
        </div>
    </div>
    
    
    <!-- add -->
    <div class="card mainCard" v-if="showCard">
        <div class="card-body">
            <h5 class="card-title">Ajouter un administrateur</h5>
            <div class="input-group mb-3">
                <input v-model="toSend.username" type="text" class="form-control" placeholder="Identifiant" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="firstPassword" type="password" placeholder="Mot de passe" class="form-control" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="toSend.password" type="password" placeholder="Confirmer mot de passe" class="form-control" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <label class="my-1 mr-1" for="inlineFormCustomSelectPref">Accès complet?</label>
                <select v-model="toSend.superRoot" class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                                                <option selected value=true>Oui</option>
                                                <option value=false>Non</option>
                                              </select>
            </div>
            <button @click="addIntern(this.toSend)" class="btn btn-success"> Valider</button>
            <button @click="showCardFn" class="btn btn-secondary">Quitter</button>
        </div>
    </div>
    
    <!-- update  -->
    <div class="card mainCard" v-if="showCardUp">
        <div class="card-body">
            <h5 class="card-title"> Modifier un administrateur</h5>
            <div class="input-group mb-3">
                <input v-model="thisShip.username" type="text" class="form-control" placeholder="Identifiant" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="firstPassword" type="password" placeholder="Mot de passe" class="form-control" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="thisShip.password" type="password" placeholder="Confirmer mot de passe" class="form-control" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <label class="my-1 mr-1" for="inlineFormCustomSelectPref">Accès complet?</label>
                <select v-model="thisShip.superRoot" class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                                                <option selected>Choisir</option>
                                                <option value=true>Oui</option>
                                                <option value=false>Non</option>
                                              </select>
            </div>
            <button @click="updatingDatas(this.thisShip.id, this.thisShip)" class="btn btn-success">Valider</button>
        </div>
    </div>
    
    
    <!-- delete -->
    <div class="card mainCard" v-if="showCardDel">
        <div class="card-body">
    
            <h6> Veux-tu vraiment supprimer ce compte? </h6>
            <button @click="destroy(idToDelete)" class="btn btn-success">Valider</button>
            <button @click="exitDelete" class="btn btn-success">Annuler</button>
        </div>
    </div>
    <div @click="showCardFn" id="add">
        <img src="../assets/add.png" />
    </div>
</template>

<script>
import { adminService } from "@/services/admin.service";
import { accountService } from "@/services/connection.service";

export default {
    name: "Admins",

    mounted() {
        this.getAll();
    },

    data() {
        return {
            tabDatas: [],
            toSend: {
                username: "",
                password: "",
                superRoot: false
            },
            showCard: false,
            tabErrors: [],
            showCardUp: false,
            showCardDel: false,
            showCardError: false,
            thisShip: [],
            idToDelete: 0,
            nameShip: "",
            tabToSelect: [],
            firstPassword: ""
        };
    },
    methods: {
        getAll() {
            adminService.getAllAdmin().then((x) => {
                x.data.forEach((y) => {

                    if (y.superRoot) y.superRoot = "Oui"
                    if (!y.superRoot) y.superRoot = "Non"

                    this.tabDatas.push(y);

                });
            });
        },

        async fullAccess() {
            const access = await accountService.getThisAdmin();
            if (access.data.superRoot) return true;
            return false;
        },

        async addIntern(toSend) {

            if (toSend.password == this.firstPassword) {
                const access = await this.fullAccess()
                if (access) {
                    adminService.addAdmin(toSend)
                        .then(() => {
                            this.tabDatas = [];
                            this.showCard = !this.showCard;
                            this.getAll();

                        }).catch((error) => {

                            this.showCard = !this.showCard;
                            this.showCardError = !this.showCardError;
                            this.tabErrors = error.response.data.errors

                        });
                };
            }


        },
        showCardFn() {
            this.showCard = !this.showCard;
        },

        updating(event) {

            let idUpdate = parseInt(event.target.parentElement.id);
            this.thisShip = this.tabDatas.find(obj => obj.id === idUpdate);
            console.log(this.thisShip)
            if (!this.showCardUp) {
                this.showCardUp = !this.showCardUp;
            };

        },

        async updatingDatas(id, datas) {

            if (this.thisShip.password == this.firstPassword) {
                const access = await this.fullAccess();
                if (access) {
                    adminService.update(id, datas)
                        .then(res => {
                            if (res.superRoot) res.superRoot = "Oui"
                            if (!res.superRoot) res.superRoot = "Non"
                            console.log(res);
                            if (res.status === 201) {
                                this.showCardUp = !this.showCardUp;
                            };
                            this.tabDatas = [];
                            this.getAll()

                        })
                        .catch(error => console.log(error.message));
                }
            }
        },

        exitDelete() {
            this.showCardDel = false;
        },

       async destroy(id) {
            const access = await this.fullAccess();
            if (access) {
                adminService.destroy(id).then(() => {
                        this.tabDatas = [];
                        this.getAll();
                        this.showCardDel = !this.showCardDel;

                    })
                    .catch(error => console.log(error));
            }
        },

        deleting(event) {

            this.idToDelete = event.target.parentElement.id;

            if (!this.showCardDel) {
                this.showCardDel = !this.showCardDel;
            };
        },

        closeError() {
            this.showCardError = false;
        }
    }
};
</script>

<style lang="scss" scoped>
table {
    margin-left: 25%;
    width: 50%;
    img {
        width: 25px;
        visibility: hidden;
    }
    tr:hover {
        img {
            visibility: visible;
        }
    }
    thead:first-child {
        background-color: rgba(198, 192, 192, 0.87);
    }
}

#mainError {
    z-index: 11;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

#error {
    position: absolute;
    top: 20vh;
    background: linear-gradient(135deg, #ffbe0b 0%, #ff5100 100%);
    border-radius: 5px;
    box-shadow: 2px 2px 8px grey;
    display: inline-block;
    p {
        color: black;
        padding: 1vw;
        font-size: 1rem;
    }
    button {
        width: 25%;
        margin-left: 40%;
        font-size: 0.8em;
    }
}

#add {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.mainCard {
    z-index: 11;
    position: absolute;
    top: 20vh;
    left: 35vw;
    box-shadow: 3px 2px 8px grey;
    width: 400px;
    background: linear-gradient(135deg, #ff5100, #ffbe0b 100% 0%);
    display: flex;
    flex-direction: column;
    align-items: center;
    label {
        margin-right: 1vw;
    }
    button {
        width: 100%;
        margin-top: 1vh;
    }
}
</style>
