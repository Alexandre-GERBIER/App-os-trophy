<template>
    <div id="boutonTrophy">
        <sui-button @click.native="toggle">Créer un trophée</sui-button>
        <sui-modal v-model="open">
        <sui-modal-header>Créer un trophée : {{ TrophyName }}</sui-modal-header>
        <form class="ui grid">
          <div class="four wide column">
          </div>
          <div class="six wide column">
              <label> Titre </label>
              <sui-input name="TrophyName" v-model="TrophyName"/>
          </div>
          <div class="six wide column">
              <sui-dropdown fluid multiple :options="textModule" placeholder="Modules" selection v-model="current" :value="selectedModules" />
          </div>
          <div class="four wide column">
              <label>  Valeur du trophée :</label>
              <sui-form-field>
                <sui-checkbox name="TrophyValue" label="platine" radio value="platine" v-model="TrophyValue"/>
              </sui-form-field>
              <sui-form-field>
                <sui-checkbox name="TrophyValue" label="or" radio value="or" v-model="TrophyValue"/>
              </sui-form-field>
              <sui-form-field>
                <sui-checkbox name="TrophyValue" label="argent" radio value="argent" v-model="TrophyValue"/>
              </sui-form-field>
              <sui-form-field>
                <sui-checkbox name="TrophyValue" label="bronze" radio value="bronze" v-model="TrophyValue"/>
              </sui-form-field>
          </div>
          <div class="six wide column">
              <label> Conditions d'obtentions: </label>
              <sui-input name="descTrophy" :value="TrophyDescription"/>
          </div>
          <div class="six wide column">
              <!-- sauvegarder le trophée mais invisible pour les étudiants 
                  <sui-checkbox label="Visible" toggle value="visible"/>
                -->
              <br> <br>
              <sui-checkbox label="vote" :sync="true" toggle value="vote" @change="vote = !vote"/>
          </div>
          <div class="four wide column">
               <p class="hidden"></p>
               <!-- remplissage de la grille pour aligner les composants -->
          </div>
          <div class="six wide column"></div>
          <div class="six wide column">
              <div v-show="vote">
              <!-- manque javascript pour avoir une entrée calendrier:
              $('#example2').calendar({
                type: 'date'
                    });
                    ou l'extension vuejs-datepicker sortie il y a 15 jours
                    puis balise :
                          <datepicker placeholder="Select Date"></datepicker>
              <vuejs-datepicker placeholder="date de fin de vote"></vuejs-datepicker>
            -->
            calendrier
              </div>
          </div>
          <div class="six wide column"></div><!-- remplissage de la grille pour centrer le boutton -->
          <div class="four wide column" >
              <sui-button circular class="centered"> Délivrer le trophée </sui-button>
          </div>
        </form>
            <sui-modal-actions>
                <sui-button positive>Créer (Envoi serveur)</sui-button>
                <sui-button negative @click.native="toggle">Annuler</sui-button>
            </sui-modal-actions>
        </sui-modal>
    </div>
</template>

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vuejs-datepicker"></script>
<script>
export default {
  name: 'CreateTrophy',
  data () {
    return {
      open: false,
      vote: false,
      current: null,
      TrophyName: "",
      TrophyValue: "",
      TrophyDescription: "",
      textModule: [
        { key: 'M3310', text: 'M3310 maths', value: 'M3310 maths' },
        { key: 'M3315', text: 'M3315 algèbre', value: 'M3315 algèbre'},
        { key: 'M1111', text: 'M1111 modélisation de données', value: 'M1111 modélisation de données'}
      ],
      selectedModules: []
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    say: function (tmp) {
        tmp = !tmp
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
div{
    font-family: 'Lato';
    /*padding: 5px;*/
}
#img{
    zoom: 20%;
    -moz-transform: scale(0.35);
}
#exception{
    margin: 0px;
}
</style>
