<template>
    <div>
      <sui-container>
        <h2 is="sui-header">Mes modules</h2>
        <sui-table unstackable>
          <sui-table-header>
            <sui-table-row>
              <sui-table-header-cell>Module</sui-table-header-cell>
              <sui-table-header-cell>Trophées</sui-table-header-cell>
              <sui-table-header-cell>Visible</sui-table-header-cell>
            </sui-table-row>
          </sui-table-header>
          <sui-table-body>
            <sui-table-row v-for="module in modulesList" :key="module.nom">
              <sui-table-cell><router-link :to="'/teacher/module/' + module.reference">{{module.reference}} - {{module.nom}}</router-link></sui-table-cell>
              <sui-table-cell>{{module.trophies}}</sui-table-cell>
              <sui-table-cell v-if="module.visible" positive><i class="check icon"></i></sui-table-cell>
              <sui-table-row  v-else negative><i class="close icon"></i></sui-table-row>
            </sui-table-row>
          </sui-table-body>
        </sui-table>

        <ModalCreateModule/>
      </sui-container>
    </div>
</template>

<script>

import axios from 'axios'
import global from '@/globals.json'

import Vue from 'vue'
import CreateTrophy from '@/components/CreateTrophy'
import CreateModule from '@/components/CreateModule'
Vue.component('ModalCreateModule', CreateModule)

export default {
  components: { CreateTrophy },
  data () {
    return {
      loadingModulesList: [],
      modulesList: [],
      errors: []
    }
  },

  mounted () {
    axios.get(global.API + '/prof/module/' + this.$session.get('user_account'))
      .then(response => {
        this.loadingModulesList = response.data
        for (let module of this.loadingModulesList) {
          module.visible = true // TODO changer ça
          module.trophies = 0
        }

        for (let module of this.loadingModulesList) {
          axios.get(global.API + '/trophy/module/' + module.reference)
            .then(response => {
              module.trophies = response.data.length
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
  }
}
</script>

<style>

</style>
