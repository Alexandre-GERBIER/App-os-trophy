<template>
    <div id="boutonVote">
        <sui-button class="inverted green" role='button' @click="toggle">Délivrer</sui-button>
        <sui-modal v-model="open">
            <sui-modal-header>Délivrer le trophée</sui-modal-header>
            <sui-modal-content>
                <label>Etudiants concernés</label>
            <sui-dropdown fluid multiple :options="students" selection v-model="studentSelec">
            </sui-dropdown>
            </sui-modal-content>
            <sui-modal-actions>
                <sui-button positive>Déliverer (Envoi au serveur)</sui-button>
                <sui-button negative @click="toggle">Annuler</sui-button>
            </sui-modal-actions>
        </sui-modal>
    </div>
</template>

<script>

import axios from 'axios'
import global from '@/globals.json'

export default {
  name: 'DeliverTrophy',
  props: {
    numodule: ''
  },
  data () {
    return {
      open: false,
      studentSelec: null,
      alldata: [],
      students: []
    }
  },
  mounted () {
    axios.get(global.API + '/student/module/' + this.numodule)
      .then(res => {
        this.alldata = res.data
        this.alldata.forEach(stud => {
          this.students.push({'text': stud.nom + ' ' + stud.prenom, 'value': stud.nom + ' ' + stud.prenom})
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
