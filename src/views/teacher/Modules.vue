<template>
    <div>
      <sui-container>
        <h2 is="sui-header">Mes modules</h2>
        <sui-table color="olive" unstackable>
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
              <sui-table-cell>
                <span v-if="!module.trophies_loaded" class="ui active inline loader tiny"></span>
                <span v-else >{{module.trophies.length}}</span>
              </sui-table-cell>
              <sui-table-cell>
                <div v-if="!module.visible_loaded" class="ui active inline loader tiny"></div>
                <div v-else>
                  <i v-if="module.visible" class="check icon" positive></i>
                  <i v-else class="close icon" negative></i>
                </div>
              </sui-table-cell>
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
      modulesList: [],
      errors: []
    }
  },

  mounted () {
    let getTrophies = () => {
      for (let module of this.modulesList) {
        axios.get(global.API + '/trophy/module/' + module.reference)
          .then(response => {
            module.trophies = response.data
            module.trophies_loaded = true
            this.modulesList.sort((a, b) => (a.reference - b.reference))
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }

    if (localStorage.getItem('modules')) {
      this.modulesList = JSON.parse(localStorage.getItem('modules'))
      getTrophies()
    } else {
      axios.get(global.API + '/prof/module/' + this.$session.get('user_account'))
        .then(response => {
          this.modulesList = response.data
          for (let module of this.modulesList) {
            module.visible = true // TODO changer ça
            module.trophies = 0
            module.trophies_loaded = false
            module.visible_loaded = true // TODO changer ça aussi
          }
          localStorage.setItem('modules', JSON.stringify(this.modulesList))
          getTrophies()
        })
    }
  }
}
</script>

<style>

</style>
