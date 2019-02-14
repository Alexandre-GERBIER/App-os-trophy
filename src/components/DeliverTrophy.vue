<template>
    <div id="boutonVote">
        <sui-button id="bouton_big" class="inverted green" @click="toggle">Délivrer</sui-button>
        <sui-button id="bouton_small" class="inverted green" @click="toggle"></sui-button>
        <sui-modal v-model="open">
            <sui-modal-header>Délivrer le trophée</sui-modal-header>
            <sui-modal-content>
                <label>Etudiants concernés</label>
            <sui-dropdown fluid multiple :options="students" selection v-model="studentSelec">
            </sui-dropdown>
            </sui-modal-content>
            <sui-modal-actions>
                <sui-button positive>Délivrer</sui-button>
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

  @media (max-width: 700px) {
    #bouton_big {
      display: none;
    }
  }

  @media (min-width: 701px) {
    #bouton_small {
      display: none;
    }
  }

</style>
