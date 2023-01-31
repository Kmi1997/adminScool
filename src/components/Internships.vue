<template>
    <table class="table table-xl table-hover table-group-divider">
        <thead>
            <tr>
                <th scope="col">Nom</th>
                <th scope="col">Dates</th>
                <th scope="col">Heures</th>
                <th scope="col">Lieu</th>
                <th scope="col">Places</th>
                <th scope="col">Prix</th>
                <th scope="col">À partir de</th>
    
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="info in tabDatas">
                <th scope="row">{{ info.name }}</th>
                <td>Du {{ info.startDate }} au {{ info.endDate }}</td>
                <td>{{ info.startHour }} à {{ info.endHour }}</td>
                <td>{{ info.place }}</td>
                <td>{{ info.numberAvailable }}</td>
                <td>{{ info.price }}€</td>
                <td>{{ info.fromAge }} ans</td>
                <td :id="info.id"><img @click="deleting($event)" src="../assets/delete.png" /> <img @click="updating($event)" src="../assets/update.png" /></td>
            </tr>
        </tbody>
    </table>
    
    <div id="error" v-if="isError && !showCard">
        <p> {{ errorToSend }}</p>
    </div>
    
    <!-- add -->
    <div class="card mainCard" v-if="showCard">
        <div class="card-body">
            <h5 class="card-title">Ajouter un stage</h5>
            <div class="input-group mb-3">
                <input v-model="toSend.name" type="text" class="form-control" placeholder="Nom" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="toSend.startDate" type="date" class="form-control" aria-describedby="basic-addon1" />
                <input v-model="toSend.endDate" type="date" class="form-control" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="toSend.startHour" type="time" class="form-control" aria-describedby="basic-addon1" />
                <input v-model="toSend.endHour" type="time" class="form-control" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="toSend.place" type="text" class="form-control" placeholder="Lieu" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="toSend.numberAvailable" type="text" class="form-control" placeholder="Places" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="toSend.price" type="text" class="form-control" placeholder="Prix" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="toSend.fromAge" type="text" class="form-control" placeholder="À partir de" aria-describedby="basic-addon1" />
            </div>
            <button @click="addInternship(this.toSend)" class="btn btn-success"> Valider</button>
            <button @click="showCardFn" class="btn btn-secondary">Quitter</button>
        </div>
    </div>
    
    <!-- update  -->
    <div class="card mainCard" v-if="showCardUp">
        <div class="card-body">
            <h5 class="card-title"> Modifier un stage</h5>
            <div class="input-group mb-3">
                <input v-model="thisShip.name" type="text" class="form-control" placeholder="Nom" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="thisShip.startDate" type="date" class="form-control" aria-describedby="basic-addon1" />
                <input v-model="thisShip.endDate" type="date" class="form-control" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="thisShip.startHour" type="time" class="form-control" aria-describedby="basic-addon1" />
                <input v-model="thisShip.endHour" type="time" class="form-control" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="thisShip.place" type="text" class="form-control" placeholder="Lieu" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="thisShip.numberAvailable" type="number" class="form-control" placeholder="Places" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="thisShip.price" type="number" class="form-control" placeholder="Prix" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="thisShip.fromAge" type="number" class="form-control" placeholder="À partir de" aria-describedby="basic-addon1" />
            </div>
            <button @click="updatingDatas(this.thisShip.id, this.thisShip)" class="btn btn-success">Valider</button>
        </div>
    </div>
    
    <div class="card mainCard" v-if="showCardDel">
        <div class="card-body">
           
            <h6> Veux-tu vraiment supprimer ce stage? </h6>
            <button @click="destroy(idToDelete)" class="btn btn-success">Valider</button>
            <button @click="exitDelete" class="btn btn-success">Annuler</button>
        </div>
    </div>
    <div @click="showCardFn" id="add">
        <img src="../assets/add.png" />
    </div>
</template>

<script>
import { internshipService } from "@/services/internships.service";

export default {
    name: "Internships",
    mounted() {
        this.getAll();
    },
    data() {
        return {
            tabDatas: [],
            toSend: {
                name: "",
                startDate: "",
                endDate: "",
                endHour: "",
                startHour: "",
                fromAge: "",
                place: "",
                numberAvailable: "",
                price: ""
            },
            showCard: false,
            errorToSend: "Données de formulaire inexactes",
            isError: false,
            showCardUp: false,
            showCardDel: false,
            thisShip: [],
            idToDelete: 0
        };
    },
    methods: {
        getAll() {
            internshipService.getAllInternships().then((x) => {
                x.data.forEach((y) => {
                    this.tabDatas.push(y);
                });
            });
        },
        addInternship(toSend) {
            console.log(toSend);
            internshipService
                .addInternship(toSend)
                .then((x) => {
                    if (x == undefined) {
                        this.showCard = !this.showCard;

                        this.isError = true;
                    } else {
                        this.showCard = !this.showCard;
                        this.tabDatas = [];
                        this.getAll();
                        this.isError = false;
                    };
                })
                .catch((error) => {
                    console.log(error);
                });

        },
        showCardFn() {
            this.showCard = !this.showCard;
        },
        updating(event) {

            let idUpdate = parseInt(event.target.parentElement.id);
            this.thisShip = this.tabDatas.find(obj => obj.id === idUpdate)

            if (!this.showCardUp) {
                this.showCardUp = !this.showCardUp;
            };

        },

        updatingDatas(id, datas) {
            console.log(id, datas)
            datas.fromAge = parseInt(datas.fromAge);
            internshipService.update(id, datas)
                .then(res => {
                    console.log(res);
                    if (res.status === 201) {
                        this.showCardUp = !this.showCardUp;
                    };
                })
                .catch(error => console.log(error.message));
        },

        exitDelete() {
            this.showCardDel = false;
        },

        destroy(id) {
            internshipService.destroy(id).then(message => {
                this.tabDatas = [];
                this.getAll();
                this.showCardDel = !this.showCardDel;

            })
            .catch(error => console.log(error))
        },

        deleting(event) {

            this.idToDelete = event.target.parentElement.id;
            
            if (!this.showCardDel) {
                this.showCardDel = !this.showCardDel;
            };

        },
    }
}
</script>

<style lang="scss" scoped>
table {
    img {
        width: 25px;
        visibility: hidden;
    }
    tr:hover {
        img {
            visibility: visible;
        }
    }
}

#error {
    z-index: 11;
    position: absolute;
    top: 30vh;
    background: linear-gradient(135deg, #ffbe0b 0%, #ff5100 100%);
    border-radius: 5px;
    box-shadow: 2px 2px 8px grey;
    width: 40%;
    margin-left: 30%;
    p {
        color: black;
        padding: 3vw;
        font-size: 1.8em;
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
    button {
        width: 100%;
        margin-top: 1vh;
    }
}
</style>
