<template>
    <div id="boutonVote">
        <button class='ui green inverted button' role='button' @click="toggle">Voter</button>
        <sui-modal v-model="open">
            <sui-modal-header>Voter</sui-modal-header>
            <sui-modal-content>
                <sui-dropdown
                  fluid
                  :options="skills"
                  placeholder="Etudiant"
                  search
                  selection
                  v-model="current"
                />
            </sui-modal-content>
            <sui-modal-actions>
                <sui-button positive>Confirmer (Envoi serveur)</sui-button>
                <sui-button negative @click="toggle">Annuler</sui-button>
            </sui-modal-actions>
        </sui-modal>
    </div>
</template>

<script>
export default {
  name: 'vote',
  data () {
    return {
      current: null,
      open: false,
      skills: [
        { key: 'BO', value: 'BO', text: 'Bob fterz' },
        { key: 'JE', value: 'JE', text: 'Jean fgsfgs' },
        { key: 'TO', value: 'TO', text: 'Toto grtdgr' }
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
