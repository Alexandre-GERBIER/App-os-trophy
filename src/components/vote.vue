<template>
    <div id="boutonVote">
        <button class='ui green inverted button' role='button' @click="toggle">Voter</button>
        <sui-modal v-model="open">
            <sui-modal-header>Voter</sui-modal-header>
            <sui-modal-content>
                <select name="thelist">
                    <option v-for="personne in listePersonnes" :key="personne[0]">{{personne}}</option>
                </select>
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
      open: false,
      listePersonnes: [
        {
          nom: 'rety',
          prenom: 'Joe'
        },
        {
          nom: 'ytry',
          prenom: 'Paul'
        },
        {
          nom: 'sfs',
          prenom: 'Bob'
        },
        {
          nom: 'ghdtgh',
          prenom: 'Jean'
        }
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
