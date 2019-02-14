<template>
    <div>
        <h2 is="sui-header">Module {{ $route.params.reference }} - {{name}} </h2>
        <sui-grid class="centered">
          <sui-grid-column :width="8">
            <sui-divider fitted/>
            <p>Nombre d'étudiants inscrits au module : <b>{{numetu}}</b></p>
            <sui-divider hidden/>
          </sui-grid-column>
        </sui-grid>

        <h3 is="sui-header" class="centered">Trophées ( {{numtro}} disponibles )</h3>

        <sui-container>
        <sui-table  color="orange" unstackable>
          <sui-table-header>
              <sui-table-row>
                  <sui-table-header-cell>Nom</sui-table-header-cell>
                  <sui-table-header-cell>Valeur</sui-table-header-cell>
                  <sui-table-header-cell class="vue_small">Vote</sui-table-header-cell>
                  <sui-table-header-cell>Délivrer</sui-table-header-cell>
                  <sui-table-header-cell>Informations</sui-table-header-cell>
              </sui-table-row>
          </sui-table-header>
          <sui-table-body>
              <sui-table-row v-for="trophy in trophies" :key="trophy.nom">
                  <sui-table-cell>{{trophy.titre}}</sui-table-cell>
                  <sui-table-cell><img width=40 height=40 :src="'/static/images/imageTrophee' + trophy.type.charAt(0).toUpperCase() + trophy.type.slice(1) + '.png'" /></sui-table-cell>
                  <sui-table-cell class="vue_small"><i class="check icon" v-if="!trophy.vote" ></i></sui-table-cell>
                  <sui-table-cell ><DeliverTrophy :numodule="trophy.numod"/></sui-table-cell>
                  <sui-table-cell text-align="right"><EditTrophy :id="trophy.nutroph"  /></sui-table-cell>
              </sui-table-row>
          </sui-table-body>
        </sui-table>
        <CreateTrophy/>
      </sui-container>
    </div>
</template>

<script>

import DeliverTrophy from '@/components/DeliverTrophy'
import EditTrophy from '@/components/EditTrophy'
import CreateTrophy from '@/components/CreateTrophy'
import axios from 'axios'
import global from '@/globals.json'

export default {

  components: {DeliverTrophy, EditTrophy, CreateTrophy},
  data () {
    return {
      id: this.$route.params.reference,
      name: 'loading...',
      numetu: '',
      numtro: '',
      errors: [],
      trophies: []
    }
  },
  mounted () {
    axios.get(global.API + '/module/' + this.$route.params.reference)
      .then(res => {
        this.name = res.data[0].nom
        axios.get(global.API + '/module/' + this.$route.params.reference)
          .then(res => {
            this.numetu = res.data.length
          })
          .catch(e => {
            this.errors.push(e)
          })
        axios.get(global.API + '/trophy/module/' + this.$route.params.reference)
          .then(res => {
            this.numtro = res.data.length
            this.trophies = res.data
          })
          .catch(e => {
            this.errors.push(e)
          })
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<style>

  @media (max-width: 700px) {
    .vue_small {
      display: none;
    }
  }
</style>
