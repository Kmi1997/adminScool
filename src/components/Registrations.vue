<template>
    <table class="table table-xl table-hover table-group-divider">
        <thead>
            <tr>
                <th scope="col">Parent</th>
                <th scope="col">Téléphone</th>
                <th scope="col">Mail</th>
                <th scope="col">Payée</th>
                <th scope="col">Nom</th>
                <th scope="col">Age</th>
                <th scope="col">Droits à l'image</th>
                <th scope="col">Problème de santé</th>
                <th scope="col">Inscrit à </th>
                <th scope="col"></th>
    
            </tr>
        </thead>
        <tbody>
            <tr v-for="info in tabDatas">
                <th scope="row">{{ info.parentName }}</th>
                <td>{{ info.parentPhone }}</td>
                <td>{{ info.mail }}</td>
                <td> {{info.paid}} </td>
                <td>{{ info.childName }}</td>
                <td>{{ info.age }} ans </td>
                <td>{{ info.imgRights }} </td>
                <td>{{ info.healthIssues }} </td>
                <td>{{ info.Internships[0].name || info.Internships[0] }} </td>
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
            <h5 class="card-title">Ajouter un stagiaire</h5>
            <div class="input-group mb-3">
                <input v-model="toSend.parentName" type="text" class="form-control" placeholder="Nom du parent" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="toSend.parentPhone" type="text" placeholder="Téléphone" class="form-control" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="toSend.mail" type="email" placeholder="Email" class="form-control" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <label class="my-1 mr-1" for="inlineFormCustomSelectPref">Inscription payée?</label>
                <select v-model="toSend.paid" class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                  <option selected>Choisir</option>
                  <option value=true>Oui</option>
                  <option value=false>Non</option>
                </select>
            </div>
    
            <div class="input-group mb-3">
                <input v-model="toSend.childName" type="text" class="form-control" placeholder="Nom de l'enfant" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="toSend.age" type="number" class="form-control" placeholder="Age" aria-describedby="basic-addon1" />
            </div>
            <div class="input-group mb-3">
                <input v-model="toSend.healthIssues" type="text" class="form-control" placeholder="Problèmes de santé?" aria-describedby="basic-addon1" />
            </div>
            <div>
                <label class="my-1 mr-1" for="inlineFormCustomSelectPref">Droits à l'image</label>
                <select v-model="toSend.imgRights" class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                  <option  selected>Choisir</option>
                  <option value=true>Oui</option>
                  <option value=false>Non</option>
                </select>
            </div>
    
            <div class="input-group mb-1">
                <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Stage de l'enfant</label>
                <select v-model="toSend.internshipId" class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                  <option selected>Choisir</option>
                  <option v-for="info in tabToSelect" :value="info.id"> {{ info.name }}</option>
                </select>
            </div>
            <button @click="addIntern(this.toSend)" class="btn btn-success"> Valider</button>
            <button @click="showCardFn" class="btn btn-secondary">Quitter</button>
        </div>
    </div>
    
    <!-- update  -->
    <div class="card mainCard" v-if="showCardUp">
        <div class="card-body">
            <h5 class="card-title"> Modifier une inscription</h5>
            <div class="input-group mb-3">
                <input v-model="thisShip.parentName" type="text" class="form-control" placeholder="Nom du parent" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="thisShip.parentPhone" type="text" placeholder="Téléphone" class="form-control" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="thisShip.mail" type="email" placeholder="Email" class="form-control" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
              <label class="my-1 mr-1" for="inlineFormCustomSelectPref">Inscription payée?</label>
                <select v-model="thisShip.paid" class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                  <option selected>Choisir</option>
                  <option value=true>Oui</option>
                  <option value=false>Non</option>
                </select>
            </div>
    
            <div class="input-group mb-3">
                <input v-model="thisShip.childName" type="text" class="form-control" placeholder="Nom de l'enfant" aria-describedby="basic-addon1" />
            </div>
    
            <div class="input-group mb-3">
                <input v-model="thisShip.age" type="number" class="form-control" placeholder="Age" aria-describedby="basic-addon1" />
            </div>
    
            <div>
                <label class="my-1 mr-1" for="inlineFormCustomSelectPref">Droits à l'image</label>
                <select v-model="thisShip.imgRights" class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                  <option  selected>Choisir</option>
                  <option value=true>Oui</option>
                  <option value=false>Non</option>
                </select>
            </div>
    
            <div class="input-group mb-1">
                <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Stage de l'enfant</label>
                <select v-model="thisShip.internshipId" class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                  <option selected>Choisir</option>
                  <option v-for="info in tabToSelect" :value="info.id"> {{ info.name }}</option>
                </select>
            </div>
            <button @click="updatingDatas(this.thisShip.id, this.thisShip)" class="btn btn-success">Valider</button>
        </div>
    </div>
    

    <!-- delete -->
    <div class="card mainCard" v-if="showCardDel">
        <div class="card-body">
    
            <h6> Veux-tu vraiment supprimer cette inscription? </h6>
            <button @click="destroy(idToDelete)" class="btn btn-success">Valider</button>
            <button @click="exitDelete" class="btn btn-success">Annuler</button>
        </div>
    </div>
    <div @click="showCardFn" id="add">
        <img src="../assets/add.png" />
    </div>
</template>

<script>
import { internService } from "@/services/intern.service";
import { internshipService } from "@/services/internships.service";

export default {
    name: "Registration",

    mounted() {
        this.getAll();
        internshipService.getAllInternships().then((datas) => {
            datas.data.forEach((subData) => {
                this.tabToSelect.push({ name: subData.name, id: subData.id })
            })
        })
    },

    data() {
        return {
            tabDatas: [],
            toSend: {
                childName: "",
                parentName: "",
                parentPhone: "",
                mail: "",
                healthIssues: "",
                imgRights: false,
                internshipId: "",
                paid: false
            },
            showCard: false,
            tabErrors: [],
            showCardUp: false,
            showCardDel: false,
            showCardError: false,
            thisShip: [],
            idToDelete: 0,
            nameShip: "",
            tabToSelect: []
        };
    },
    methods: {
        getAll() {
            internService.getAllInterns().then((x) => {
                x.data.forEach((y) => {
                  console.log(y)
                    if (!y.Internships[0]) y.Internships[0] = "Aucun stage"
                    if (!y.paid) {
                        y.paid = "Non";
                    } else {
                        y.paid = "Oui";
                    }

                    if (!y.imgRights) {
                        y.imgRights = "Non";
                    } else {
                        y.imgRights = "Oui";
                    }

                    this.tabDatas.push(y);
                });
            });
        },

        addIntern(toSend) {
            console.log(toSend)
            internService.addIntern(toSend)
                .then(() => {
                    this.tabDatas = [];
                    this.showCard = !this.showCard;
                    this.getAll();
                })
                .catch(error => {

                    this.showCard = !this.showCard;
                    this.showCardError = !this.showCardError;
                    this.tabErrors = error.response.data.errors;
                });
        },
        showCardFn() {
            this.showCard = !this.showCard;
        },
        updating(event) {

            let idUpdate = parseInt(event.target.parentElement.id);
            this.thisShip = this.tabDatas.find(obj => obj.id === idUpdate);

            if (!this.showCardUp) {
                this.showCardUp = !this.showCardUp;
            };

        },

        updatingDatas(id, datas) {
            console.log(id, datas);
            datas.fromAge = parseInt(datas.fromAge);
            internService.update(id, datas)
                .then(res => {
                    console.log(res);
                    if (res.status === 201) {
                        this.showCardUp = !this.showCardUp;
                        
                        if(this.thisShip.paid) this.thisShip.paid = "Oui"
                        if(!this.thisShip.paid) this.thisShip.paid = "Non"
                        if(this.thisShip.imgRights) this.thisShip.imgRights = "Oui"
                        if(!this.thisShip.imgRights) this.thisShip.imgRights = "Non"

                    };
                })
                .catch(error => console.log(error.message));
        },

        exitDelete() {
            this.showCardDel = false;
        },

        destroy(id) {
            internService.destroy(id).then(() => {
                    this.tabDatas = [];
                    this.getAll();
                    this.showCardDel = !this.showCardDel;

                })
                .catch(error => console.log(error));
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
    img {
        width: 25px;
        visibility: hidden;
    }
    tr:hover {
        img {
            visibility: visible;
        }
    }
    thead:first-child{
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
        font-size: 1em;
    }
    button {
        width: 20%;
        margin-left: 40%;
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
