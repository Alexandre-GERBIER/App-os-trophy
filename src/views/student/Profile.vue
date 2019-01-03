<template>
    <div>
        <div id="infoProfil">

            <h2 is="sui-header" >
                <sui-image circular bordered src="/static/images/imageUser.png" /> Profil :
            </h2>

            <sui-grid class="centered">
                <sui-grid-column :width="8">
                    <sui-divider fitted/>
                </sui-grid-column>
            </sui-grid>
            <sui-grid stackable class="centered">
                <sui-grid-row id="texteProfil">
                    <sui-grid-column id="texteGras" :width="2">
                            Nom
                    </sui-grid-column>
                    <sui-grid-column :width="2">
                            {{profileInfo[0].nom}}
                    </sui-grid-column>
                    <sui-grid-column id="texteGras" :width="2">
                            Prénom
                    </sui-grid-column>
                    <sui-grid-column :width="2">
                            {{profileInfo[0].prenom}}
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <sui-grid stackable class="centered">
                <sui-grid-row id="texteProfil">
                    <sui-grid-column id="texteGras" :width="2">
                            Numéro étudiant
                    </sui-grid-column>
                    <sui-grid-column :width="2">
                            {{ profileInfo[0].nuetu}}
                    </sui-grid-column>
                    <sui-grid-column id="texteGras" :width="2">
                            Groupe
                    </sui-grid-column>
                    <sui-grid-column :width="2">
                            {{ profileInfo[0].nugr}}
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <sui-grid stackable class="centered">
                <sui-grid-row id="texteProfil">
                    <sui-grid-column id="texteGras" :width="2">
                            Institution
                    </sui-grid-column>
                    <sui-grid-column :width="2">
                            {{ profileInfo[0].institution}}
                    </sui-grid-column>
                    <sui-grid-column id="texteGras" :width="2">
                            Statut
                    </sui-grid-column>
                    <sui-grid-column :width="2">
                            oui
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <sui-divider hidden />
            <sui-divider hidden />

            <ChangePassword/>
        </div>

        <sui-divider hidden />
        <sui-divider hidden />
        <sui-divider hidden />

        <div>
            <div>
                <h1 is="sui-header" icon text-align="center">
                    <sui-header-content>Statistiques :</sui-header-content>
                </h1>
            </div>

            <sui-grid class="centered">
                <sui-grid-column :width="8">
                    <sui-divider/>
                </sui-grid-column>
            </sui-grid>

            <sui-grid stackable class="centered">
                <sui-grid-row>
                <sui-grid-column>
                    <label id="texteProfil">Niveau</label>
                </sui-grid-column>

                <sui-grid-column>
                    <label >{{currentLevel}}</label>
                </sui-grid-column>

                <sui-grid-column :width="4">
                <sui-progress id="barre"
                    state="active"
                    indicating
                    :percent="percent"
                    :label="label"/>
                </sui-grid-column>

                <sui-grid-column>
                    <label >{{nextLevel}}</label>
                </sui-grid-column>
            </sui-grid-row>

            <sui-button @click.native="calculLevel">calcul</sui-button>
            </sui-grid>
        </div>

        <sui-divider hidden />
        <sui-divider hidden />
        <sui-divider hidden />

        <div>
            <div>
                <h2 is="sui-header" icon text-align="center">
                    <sui-header-content>Nombre de trophées :</sui-header-content>
                </h2  >
            </div>

            <sui-divider hidden/>
            <sui-divider hidden/>

            <sui-grid class="centered">
                <label v-for="item in textTrophee" :key="item[0]">
                    <sui-grid-column>
                        <sui-image id="imageTrophee" :src="item[0]" size="small"/>
                        <br/>
                        <label>{{ item[1]}}</label>
                    </sui-grid-column>
                </label>
            </sui-grid>
       </div>
    </div>
</template>

<script>

import axios from 'axios'
import ChangePassword from '@/components/ChangePassword'
import global from '@/globals.json'

export default {

  components: {ChangePassword},

  data () {
    return {
      currentlvl: 0,
      nextlvl: 0,
      percent: 50,
      open: false,
      profileInfo: {},
      tabTrophies: {},
      errors: [],
      textStat: [
        ['Niveau'],
        ['(API) niveauactuel'],
        ['state="active" indicating :percent="percent" :label="label"'],
        ['(API) niveausuivant']
      ],
      textTrophee: [
        ['/static/images/imageTropheeBronze.png', '(API) nbtropheebronze'],
        ['/static/images/imageTropheeArgent.png', '(API) nbtropheeargent'],
        ['/static/images/imageTropheeOr.png', '(API) nbtropheeor'],
        ['/static/images/imageTropheePlatine.png', '(API) nbtropheeplatine']
      ]
    }
  },

  mounted () {
    axios.get(global.API + '/student/E175119X')
      .then(response => {
        this.profileInfo = response.data
        // console.log(this.profileInfo)
      })
      .catch(e => {
        this.errors.push(e)
      })
    axios.get(global.API + '/student/trophy/E175119X')
      .then(response => {
        this.tabTrophies = response.data
        // console.log(this.tabTrophies)
      })
      .catch(e => {
        this.errors.push(e)
      })
  },

  computed: {
    label () {
      return `Progression ${this.percent}%`
    },
    currentLevel () {
      return `${this.currentlvl}`
    },
    nextLevel () {
      return `${this.nextlvl}`
    }
  },
  methods: {
    calculLevel () {
      this.currentlvl = 0
      for (let index = 0; index < this.tabTrophies.length; index++) {
        switch (this.tabTrophies[index].type) {
          case 'platine':
            this.currentlvl += 4
            break
          case 'or':
            this.currentlvl += 3
            break
          case 'argent':
            this.currentlvl += 2
            break
          case 'bronze':
            this.currentlvl += 1
            break
        }
      }
      this.nextlvl = this.currentlvl + 1
    }
  }
}
</script>

<style>

#texteProfil {
    font-size: 1.2em;
    font-family: 'Lato'
}

#texteGras {
    font-weight: bold
}

h2 {
    text-align: center;
}

#imageTrophee {
    position: relative;
    left: 25%;
    zoom: 50%
}

</style>
