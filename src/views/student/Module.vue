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

                    <h3 is="sui-header">Trophées ( {{numtro}} disponibles )</h3>
                    <sui-container>
                    <sui-table unstackable>
                      <sui-table-header>
                          <sui-table-row>
                              <sui-table-header-cell>Nom</sui-table-header-cell>
                              <sui-table-header-cell>Valeur</sui-table-header-cell>
                              <sui-table-header-cell>Votes</sui-table-header-cell>
                              <!--<sui-table-header-cell>Obtenu</sui-table-header-cell>-->
                             <!--  <sui-table-header-cell text-align="right">Informations</sui-table-header-cell> -->
                          </sui-table-row>
                      </sui-table-header>
                      <sui-table-body>
                          <sui-table-row v-for="trophy in trophies" :key="trophy.nom">
                              <sui-table-cell><router-link :to="'/student/trophy/' + trophy.id">{{trophy.titre}}</router-link></sui-table-cell>
                              <sui-table-cell>{{trophy.type}}</sui-table-cell>
                              <sui-table-cell ><vote class="check icon" v-if="trophy.vote == 1" /></sui-table-cell>
                              <!--<sui-table-cell ><i class="check icon" v-if="trophy.obtenu"></i></sui-table-cell>-->
                          </sui-table-row>
                      </sui-table-body>
                    </sui-table>
                  </sui-container>
                </sui-grid-column>
        </sui-grid>
    </div>
</template>

<script>
// TODO : popup pour afficher les trophées disponibles
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
