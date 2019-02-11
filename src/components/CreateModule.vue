<template>
  <div id="boutonCreerModule">
    <sui-button class="green" @click="toggle" content="Nouveau module" icon="plus" />
    <sui-modal v-model="open">
      <sui-modal-header>
        Créer un module
      </sui-modal-header>
      <sui-modal-content>
        <sui-form>
          <sui-form-field>
            <label>Nom du module</label>
            <input name="modName" />
          </sui-form-field>
          <sui-form-field>
            <label>Référence du module</label>
            <input name="modRef" />
          </sui-form-field>
          <sui-form-field>
            <sui-checkbox label="Module visible" name="modVisible" />
          </sui-form-field>
          <sui-form-field>
            <label>Groupes concernés</label>
            <sui-dropdown fluid multiple :options="groups" selection v-model="groupSelection"></sui-dropdown>
          </sui-form-field>
        </sui-form>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive>Créer</sui-button>
        <sui-button negative>Annuler</sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>

export default {
  data () {
    return {
      open: false,
      // données de test
      groupSelection: null,
      groups: [
        {key: 'g1', text: 'g1', value: 'g1'},
        {key: 'g2', text: 'g2', value: 'g2'},
        {key: 'g3', text: 'g3', value: 'g3'},
        {key: 'g4', text: 'g4', value: 'g4'},
        {key: 'g5', text: 'g5', value: 'g5'},
        {key: 'g6', text: 'g6', value: 'g6'}
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
