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
                <sui-grid-row class="texteProfil">
                    <sui-grid-column class="texteGras" :width="2">
                            Nom
                    </sui-grid-column>
                    <sui-grid-column :width="2">
                            {{profileInfo[0].nom}}
                    </sui-grid-column>
                    <sui-grid-column class="texteGras" :width="2">
                            Prénom
                    </sui-grid-column>
                    <sui-grid-column :width="2">
                            {{profileInfo[0].prenom}}
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <sui-grid class="centered">
                <sui-grid-column :width="4">
                    <sui-divider hidden fitted/>
                </sui-grid-column>
                <sui-grid-column :width="4">
                    <sui-divider hidden fitted/>
                </sui-grid-column>
            </sui-grid>
            <sui-grid stackable class="centered">
                <sui-grid-row class="texteProfil">
                    <sui-grid-column class="texteGras" :width="2">
                            Numéro étudiant
                    </sui-grid-column>
                    <sui-grid-column :width="2">
                            {{ profileInfo[0].nuetu}}
                    </sui-grid-column>
                    <sui-grid-column class="texteGras" :width="2">
                            Groupe
                    </sui-grid-column>
                    <sui-grid-column :width="2">
                            {{ profileInfo[0].nugr}}
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <sui-grid class="centered">
                <sui-grid-column :width="4">
                    <sui-divider hidden fitted/>
                </sui-grid-column>
                <sui-grid-column :width="4">
                    <sui-divider hidden fitted/>
                </sui-grid-column>
            </sui-grid>
            <sui-grid stackable class="centered">
                <sui-grid-row class="texteProfil">
                    <sui-grid-column class="texteGras" :width="2">
                            Institution
                    </sui-grid-column>
                    <sui-grid-column :width="2">
                            {{ profileInfo[0].institution}}
                    </sui-grid-column>
                    <sui-grid-column class="texteGras" :width="2">
                            Statut
                    </sui-grid-column>
                    <sui-grid-column :width="2">
                            Etudiant
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <sui-divider hidden />

            <ChangePassword/>
        </div>

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
                        <label class="texteProfil">Niveau</label>
                    </sui-grid-column>

                    <sui-grid-column>
                        <label class="texteGras">{{currentLevel}}</label>
                    </sui-grid-column>

                    <sui-grid-column :width="4">
                    <sui-progress id="barre"
                        state="active"
                        indicating
                        :percent="percent"
                        :label="label"/>
                    </sui-grid-column>

                    <sui-grid-column>
                        <label class="texteGras">{{nextLevel}}</label>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </div>

        <sui-divider hidden />
        <sui-divider hidden />

        <div>
            <div>
                <h2 is="sui-header" icon text-align="center">
                    <sui-header-content>Nombre de trophées :</sui-header-content>
                </h2>
            </div>

            <sui-divider hidden/>

            <sui-grid stackable class="centered">
                <sui-grid-row>
                    <sui-grid-column>
                        <sui-image class="imageTrophee" :src="textTrophee[0]" size="small"/>
                        <sui-divider hidden fitted/>
                        <label class="texteTrophee">{{nbTrophyBronze}} bronze</label>
                    </sui-grid-column>
                    <sui-grid-column>
                        <sui-image class="imageTrophee" :src="textTrophee[1]" size="small"/>
                        <sui-divider hidden fitted/>
                        <label class="texteTrophee">{{nbTrophyArgent}} argent</label>
                    </sui-grid-column>
                    <sui-grid-column>
                        <sui-image class="imageTrophee" :src="textTrophee[2]" size="small"/>
                        <sui-divider hidden fitted/>
                        <label class="texteTrophee">{{nbTrophyOr}} or</label>
                    </sui-grid-column>
                    <sui-grid-column>
                        <sui-image class="imageTrophee" :src="textTrophee[3]" size="small"/>
                        <sui-divider hidden fitted/>
                        <label class="texteTrophee">{{nbTrophyPlatine}} platine</label>
                    </sui-grid-column>
                </sui-grid-row>
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
      currentxp: 0,
      currentlvl: 0,
      nextlvl: 0,
      percent: 0,
      nbTrophyPlatine: 0,
      nbTrophyOr: 0,
      nbTrophyArgent: 0,
      nbTrophyBronze: 0,
      open: false,
      profileInfo: {},
      tabTrophies: {},
      errors: [],
      textTrophee: [
        '/static/images/imageTropheeBronze.png', '/static/images/imageTropheeArgent.png',
        '/static/images/imageTropheeOr.png', '/static/images/imageTropheePlatine.png'
      ]
    }
  },

  mounted () {
    axios.get(global.API + '/student/' + this.$session.get('user_account'))
      .then(response => {
        this.profileInfo = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    axios.get(global.API + '/trophy/student/' + this.$session.get('user_account'))
      .then(response => {
        this.tabTrophies = response.data
        this.calculLevel()
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
      this.currentxp = 0
      this.currentlvl = 0
      this.nbTrophyPlatine = 0
      this.nbTrophyOr = 0
      this.nbTrophyArgent = 0
      this.nbTrophyBronze = 0
      this.percent = 0
      for (let index = 0; index < this.tabTrophies.length; index++) {
        switch (this.tabTrophies[index].type) {
          case 'platine':
            this.currentxp += 40
            this.nbTrophyPlatine += 1
            break
          case 'or':
            this.currentxp += 30
            this.nbTrophyOr += 1
            break
          case 'argent':
            this.currentxp += 20
            this.nbTrophyArgent += 1
            break
          case 'bronze':
            this.currentxp += 10
            this.nbTrophyBronze += 1
            break
        }
      }
      this.currentlvl = Math.trunc(this.currentxp / 50)
      this.percent = Math.trunc((this.currentxp / 50 - Math.trunc(this.currentxp / 50)) * 100)
      this.nextlvl = this.currentlvl + 1
    }
  }
}
</script>

<style>

.texteProfil {
    font-size: 1.2em;
    font-family: 'Lato'
}

.texteGras {
    font-weight: bold
}

h2 {
    text-align: center;
}

.imageTrophee {
    zoom: 50%
}

.ui.centered.grid>.column:not(.aligned):not(.justified):not(.row), .ui.centered.grid>.row>.column:not(.aligned):not(.justified), .ui.grid .centered.row>.column:not(.aligned):not(.justified){
    text-align: center;
}

</style>
