<template>
    <div>
        <h2 is="sui-header">Module {{ $route.params.reference }} - {{name}} </h2>
        <sui-grid class="centered">
                <sui-grid-column :width="8">
                    <sui-divider fitted/>
                    <p>Nombre d'étudiants inscrits au module : <b>{{numetu}}</b></p>
                    <sui-divider hidden/>
                    <sui-divider hidden/>

                    <h3 is="sui-header">Trophées ( {{numtro}} disponibles )</h3>
                    <sui-container>
                    <sui-table unstackable>
                      <sui-table-header>
                          <sui-table-row>
                              <sui-table-header-cell>Nom</sui-table-header-cell>
                              <sui-table-header-cell>Valeur</sui-table-header-cell>
                              <sui-table-header-cell>Vote</sui-table-header-cell>
                              <sui-table-header-cell>Délivrer</sui-table-header-cell>
                              <sui-table-header-cell text-align="right">Informations</sui-table-header-cell>
                          </sui-table-row>
                      </sui-table-header>
                      <sui-table-body>
                          <sui-table-row v-for="trophy in trophies" :key="trophy.nom">
                              <sui-table-cell>{{trophy.titre}}</sui-table-cell>
                              <sui-table-cell><img width=40 height=40 :src="'/static/images/imageTrophee' + trophy.type.charAt(0).toUpperCase() + trophy.type.slice(1) + '.png'" /></sui-table-cell>
                              <sui-table-cell ><i class="check icon" v-if="!trophy.vote" ></i></sui-table-cell>
                              <sui-table-cell ><DeliverTrophy/></sui-table-cell>
                              <sui-table-cell text-align="right"><EditTrophy :id="trophy.nutroph"  /></sui-table-cell>
                          </sui-table-row>
                      </sui-table-body>
                    </sui-table>
                  </sui-container>
                </sui-grid-column>
        </sui-grid>
      <CreateTrophy/>
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
    console.log('oui')
    axios.get(global.API + '/module/' + this.$route.params.reference)
      .then(res => {
        this.name = res.data[0].nom
        console.log('1 : ' + this.name)
        axios.get(global.API + '/module/' + this.$route.params.reference)
          .then(res => {
            this.numetu = res.data.length
            console.log('2 : ' + this.numetu)
          })
          .catch(e => {
            this.errors.push(e)
          })
        axios.get(global.API + '/trophy/module/' + this.$route.params.reference)
          .then(res => {
            this.numtro = res.data.length
            this.trophies = res.data
            console.log('3 : ' + this.numtro)
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

</style>
