<template>
    <div>
        <sui-button @click.native="toggle">Changer de mot de passe</sui-button>
        <sui-modal v-model="open">
        <sui-modal-header>Changer de mot de passe</sui-modal-header>

            <sui-modal-content>
                <sui-grid>
                    <sui-grid-row>
                        <sui-grid-column :width="4">
                            <sui-form>
                                <sui-form-field>
                                    <label>Ancien mot de passe</label>
                                </sui-form-field>

                                <sui-form-field>
                                    <label>Nouveau mot de passe</label>
                                </sui-form-field>

                                <sui-form-field>
                                    <label>Confirmation</label>
                                </sui-form-field>
                            </sui-form>
                        </sui-grid-column>

                        <sui-grid-colum :width="6">            
                            <sui-form>     
                                <sui-form-field>
                                    <input/>
                                </sui-form-field>
                            </sui-form>
                            
                            <sui-form>     
                                <sui-form-field>
                                    <input/>
                                </sui-form-field>
                            </sui-form>

                            <sui-form>     
                                <sui-form-field>
                                    <input/>
                                </sui-form-field>
                            </sui-form>
                        </sui-grid-colum>
                    </sui-grid-row>
                </sui-grid>
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
      open: false
    };
  },

  methods: {
    toggle() {
        this.open = !this.open;
    }
  }
};
</script>


<style>

</style>
