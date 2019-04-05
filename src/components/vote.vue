<template>
    <div id="boutonVote">
        <button class='ui green inverted button' role='button' @click="toggle">Voter</button>
        <sui-modal v-model="open">
            <sui-modal-header>Voter pour : {{name}}</sui-modal-header>
            <sui-modal-content>
                <sui-dropdown
                  fluid
                  :options="studModule"
                  placeholder="Etudiant"
                  search
                  selection
                  v-model="current"></sui-dropdown>
            </sui-modal-content>
            <sui-modal-actions>
                <sui-button negative @click="toggle">Annuler</sui-button>
                <sui-button positive @click="envoieVote">Confirmer</sui-button>
            </sui-modal-actions>
        </sui-modal>
    </div>
</template>

<script>

import axios from 'axios'
import global from '@/globals.json'

export default {
  name: 'vote',
  props: {
    id: '',
    name: '',
    numod: ''
  },
  data () {
    return {
      current: null,
      open: false,
      studModule: []
    }
  },

  mounted () {
    axios.get(global.API + '/student/module/' + this.numod)
      .then(response => {
        let students = response.data
        students.forEach(student => {
          if (student.nuetu !== this.$session.get('user_account')) {
            this.studModule.push({'value': student.nuetu, 'text': student.prenom + ' ' + student.nom})
          }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
  },

  methods: {
    toggle () {
      this.open = !this.open
    },
    envoieVote () {
      axios.post(global.API + '/vote', {
        nuetu: this.current,
        nutroph: this.id,
        nuetuvotant: this.$session.get('user_account')
      })
        .then((res) => {
          this.toggle()
          window.alert('Votre vote a bien été pris en compte !')
        })
        .catch((err) => {
          window.alert('Votre vote n\'a pas pu être pris en compte à cause de l\'erreur suivante : ' + err)
        })
    }
  }
}
</script>

<style>
</style>
