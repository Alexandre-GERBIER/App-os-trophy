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
            <!--<sui-table-header-cell text-align="right">Informations</sui-table-header-cell>-->
          </sui-table-row>
        </sui-table-header>
        <sui-table-body>
          <sui-table-row v-for="module in modulesList" :key="module.nom">
            <sui-table-cell><router-link :to="'/student/module/' + module.id">{{module.reference}} - {{module.nom}}</router-link></sui-table-cell>
            <sui-table-cell>{{module.level}}</sui-table-cell>
            <sui-table-cell>{{module.trophies.length}} / {{module.max_trophies}}</sui-table-cell>
            <!--<sui-table-cell text-align="right"><router-link :to="'/student/module/' + module.id">voir -->
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
    axios.get(global.API + '/module/student/E175119X')
      .then(response => {
        this.loadingModulesList = response.data
        for (let module of this.loadingModulesList) {
          module.max_trophies = 0
          module.level = 0
          module.trophies = []
        }
        // console.log(response.data)

        axios.get(global.API + '/trophy/student/E175119X')
          .then(response => {
            for (let module of this.loadingModulesList) {
              module.trophies = response.data.filter(trophy => trophy.numod === module.reference)
              this.calculLevel(module)
              axios.get(global.API + '/trophy/module/' + module.reference)
                .then(response => {
                  module.max_trophies = response.data.length
                  this.modulesList.push(module) // on ajoute le module seulement après son chargement complet
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
      })
      .catch(e => {
        this.errors.push(e)
      })
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
