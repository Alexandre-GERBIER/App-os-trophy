<template>
    <div id="boutonPassword">
        <sui-button @click.native="toggle">Changer de mot de passe</sui-button>
        <sui-modal v-model="open">
        <sui-modal-header>Changer de mot de passe</sui-modal-header>

            <sui-modal-content>
                <label v-for="item in sections" :key="item[0]">
                    <sui-grid>
                        <sui-grid-row id="texte">
                            <sui-grid-column :width="7">
                                    {{ item[0] }}
                            </sui-grid-column>
                            <sui-grid-column>
                                <input>
                            </sui-grid-column>
                        </sui-grid-row>
                    </sui-grid>
                </label>
            </sui-modal-content>
            <sui-modal-actions>
                <sui-button positive>Confirmer (Envoi serveur)</sui-button>
                <sui-button negative @click.native="toggle">Annuler</sui-button>
            </sui-modal-actions>
        </sui-modal>
    </div>
</template>

<script>
export default {
  name: 'ChangePassword',
  data () {
    return {
      open: false,
      sections: [
        ['Ancien mot de passe'],
        ['Nouveau mot de passe'],
        ['Confirmation du mot de passe']
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

#boutonPassword{
    text-align: center;
}

#texte{
    text-align: end;
    font-family: 'Lato'
}

</style>
