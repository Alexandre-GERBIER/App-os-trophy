<template>
  <div>
    <sui-container>
      <h2 is="sui-header">Mes modules</h2>
      <sui-table unstackable>
        <sui-table-header>
          <sui-table-row>
            <sui-table-header-cell>Module</sui-table-header-cell>
            <sui-table-header-cell>Niveau</sui-table-header-cell>
            <sui-table-header-cell>Trophées</sui-table-header-cell>
          </sui-table-row>
        </sui-table-header>
        <sui-table-body>
          <sui-table-row v-for="module in modulesList" :key="module.nom">
            <sui-table-cell><router-link :to="'/student/module/' + module.reference">{{module.reference}} - {{module.nom}}</router-link></sui-table-cell>
            <sui-table-cell>
              <div v-if="!module.level_loaded" class="ui active inline loader tiny"></div>
              <div v-else >{{module.level}}</div>
            </sui-table-cell>
            <sui-table-cell>
              <span v-if="!module.progress_loaded" class="ui active inline loader tiny"></span>
              <span v-else >{{module.trophies.length}} / {{module.max_trophies}}</span>
            </sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
    </sui-container>
  </div>
</template>

<script>

import axios from 'axios'
import global from '@/globals.json'

export default {
  data () {
    return {

      loadingModulesList: [],
      modulesList: [],
      errors: []
    }
  },

  mounted () {
    let getTrophies = () => {
      axios.get(global.API + '/trophy/student/' + this.$session.get('user_account'))
        .then(response => {
          for (let module of this.modulesList) {
            module.trophies = response.data.filter(trophy => trophy.numod === module.reference)
            this.calculLevel(module)
            module.level_loaded = true
            axios.get(global.API + '/trophy/module/' + module.reference)
              .then(response => {
                module.max_trophies = response.data.length
                // this.$forceUpdate()
                module.progress_loaded = true
                // this.modulesList.push(module) // on ajoute le module seulement après son chargement complet
                this.modulesList.sort((a, b) => (a.reference - b.reference))
              })
              .catch(e => {
                this.errors.push(e)
              })
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    }

    if (localStorage.modules) {
      this.modulesList = JSON.parse(localStorage.getItem('modules'))
      console.log('ui')
      for (let module of this.modulesList) {
        console.log(module)
      }
      getTrophies()
    } else {
      axios.get(global.API + '/module/student/' + this.$session.get('user_account'))
        .then(response => {
          this.modulesList = response.data
          for (let module of this.modulesList) {
            module.max_trophies = ''
            module.level = ''
            module.trophies = []
            module.level_loaded = false
            module.progress_loaded = false
          }
          localStorage.setItem('modules', JSON.stringify(this.modulesList))
          getTrophies()
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },

  methods: {
    updateStates (module) {
      this.calculLevel(module)
    },

    calculLevel (module) {
      let currentxp = 0
      for (let index = 0; index < module.trophies.length; index++) {
        switch (module.trophies[index].type) {
          case 'platine':
            currentxp += 40
            break
          case 'or':
            currentxp += 30
            break
          case 'argent':
            currentxp += 20
            break
          case 'bronze':
            currentxp += 10
            break
        }
      }
      module.level = Math.trunc(currentxp / 50)
    }
  }
}
</script>

<style>
  li a {
    text-decoration: none;
  }
</style>
