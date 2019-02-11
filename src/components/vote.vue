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
                  v-model="current"
                />
            </sui-modal-content>
            <sui-modal-actions>
                <sui-button negative @click="toggle">Annuler</sui-button>
                <sui-button positive>Confirmer</sui-button>
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
          this.studModule.push({'value': student.prenom + ' ' + student.nom, 'text': student.prenom + ' ' + student.nom})
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
  },

  methods: {
    toggle () {
      this.open = !this.open
    }
  }
}
</script>

<style>

</style>
