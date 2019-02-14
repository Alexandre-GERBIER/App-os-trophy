<template>
    <div>
        <h2 is="sui-header">Module {{ id }} - {{name}} </h2>
        <sui-grid class="centered">
          <sui-grid-column :width="8">
              <sui-divider fitted/>
              <p>Enseignant responsable : <b>{{ teacher }}</b></p>
              <p>Nombre d'étudiants inscrits au module : <b>{{numetu}}</b></p>

              <sui-divider hidden/>
              <sui-divider hidden/>
          </sui-grid-column>
        </sui-grid>

        <h3 is="sui-header" class="centered">Trophées ( {{numtro}} disponibles )</h3>

        <sui-container>
        <sui-table color="orange" unstackable>
          <sui-table-header>
              <sui-table-row>
                  <sui-table-header-cell>Nom</sui-table-header-cell>
                  <sui-table-header-cell>Valeur</sui-table-header-cell>
                  <sui-table-header-cell>Votes</sui-table-header-cell>
              </sui-table-row>
          </sui-table-header>
          <sui-table-body>
              <sui-table-row v-for="trophy in trophies" :key="trophy.nom">
                  <sui-table-cell><router-link :to="'/student/trophy/' + trophy.nutroph">{{trophy.titre}}</router-link></sui-table-cell>
                  <sui-table-cell><img width=40 height=40 :src="'/static/images/imageTrophee' + trophy.type.charAt(0).toUpperCase() + trophy.type.slice(1) + '.png'" /></sui-table-cell>
                  <sui-table-cell>
                    <vote class="check icon" :id="trophy.nutroph"  :name="trophy.titre" :numod="trophy.numod" v-if="trophy.vote == 1"/>
                    <i v-else class="close icon"></i>
                  </sui-table-cell>
              </sui-table-row>
          </sui-table-body>
        </sui-table>
      </sui-container>
    </div>
</template>

<script>
import vote from '@/components/vote'
import axios from 'axios'
import global from '@/globals.json'

export default {

  components: {vote},

  data () {
    return {
      id: this.$route.params.reference,
      name: 'loading...',
      teacher: 'loading...',
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
        axios.get(global.API + '/prof/' + res.data[0].nuauteur)
          .then(res => {
            this.teacher = res.data[0].prenom + ' ' + res.data[0].nom
          })
          .catch(e => {
            this.errors.push(e)
          })
        axios.get(global.API + '/student/module/' + this.$route.params.reference)
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

</style>
