<template>
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
          <sui-dropdown fluid multiple :options="groups" selection v-model="groupSelection">

          </sui-dropdown>
          <!--<select class="ui simple selection fluid" name="modGroups" multiple>
              <option v-for="group in groups" :key="group" :value="group">
                {{group}}
              </option>
          </select>-->
        </sui-form-field>
      </sui-form>
    </sui-modal-content>
    <sui-modal-actions>
      <sui-button negative>
        Annuler
      </sui-button>
      <sui-button positive>
        Créer
      </sui-button>
    </sui-modal-actions>
  </sui-modal>
</template>

<script>

export default {
  data () {
    return {
      open: true,
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
  }
}
</script>

<style>

</style>
