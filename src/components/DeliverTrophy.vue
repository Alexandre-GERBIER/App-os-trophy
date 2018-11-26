<template>
    <div id="boutonVote">
        <sui-button class="inverted green" role='button' @click="toggle">Délivrer</sui-button>
        <sui-modal v-model="open">
            <sui-modal-header>Déliverer le trophée </sui-modal-header>
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
export default {
  name: 'DeliverTrophy',
  data () {
    return {
      open: false,
      studentSelec: null,
      students: [
        {key: 'Jean', text: 'Jean', value: 'Jean'},
        {key: 'Claude', text: 'Claude', value: 'Claude'},
        {key: 'Bernard', text: 'Bernard', value: 'Bernard'},
        {key: 'Louis', text: 'Louis', value: 'Louis'},
        {key: 'Eudes', text: 'Eudes', value: 'Eudes'},
        {key: 'Albert', text: 'Albert', value: 'Albert'}
      ]
    }
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
