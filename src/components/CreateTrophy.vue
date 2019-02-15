<template>
    <div id="boutonTrophy">
      <sui-button class="green" @click.native="toggle" icon="plus"> Nouveau trophée</sui-button>
      <sui-modal v-model="open" id="small_popup">
        <sui-modal-header>
          Créer un trophée : {{ TrophyName }} <br>
          Module : {{ $route.params.reference }}
        </sui-modal-header>
          <sui-grid>
            <sui-grid-row>
              <sui-grid-column :width="5">
                <sui-image v-if="TrophyValue === 'platine'" label="imageTrophy" src="/static/images/imageTropheePlatine.png" size="tiny" />
                <sui-image v-else-if="TrophyValue === 'or'" label="imageTrophy" src="/static/images/imageTropheeOr.png" size="tiny" />
                <sui-image v-else-if="TrophyValue === 'argent'" label="imageTrophy" src="/static/images/imageTropheeArgent.png" size="tiny" />
                <sui-image v-else-if="TrophyValue === 'bronze'" label="imageTrophy" src="/static/images/imageTropheeBronze.png" size="tiny" />
              </sui-grid-column>
              <sui-grid-column :width="10">
                <label> Titre :  </label>
                <sui-input name="TrophyName" v-model="TrophyName" :size="15"/>
              </sui-grid-column>
            </sui-grid-row>
            <sui-grid-row >
              <sui-grid-column :width="6"> Valeur du trophée : </sui-grid-column>
            </sui-grid-row >
            <sui-grid>
              <sui-grid-row>
                <sui-grid-column :width="8">
                  <sui-checkbox name="TrophyValue" radio value="bronze" v-model="TrophyValue">bronze</sui-checkbox>
                </sui-grid-column>
                <sui-grid-column :width="8">
                  <sui-checkbox name="TrophyValue" radio value="argent" v-model="TrophyValue">argent</sui-checkbox>
                </sui-grid-column>
              </sui-grid-row>
              <sui-grid-row>
                <sui-grid-column :width="8">
                  <sui-checkbox name="TrophyValue" radio value="or" v-model="TrophyValue">or</sui-checkbox>
                </sui-grid-column>
                <sui-grid-column :width="8">
                  <sui-checkbox name="TrophyValue" radio value="platine" v-model="TrophyValue">platine</sui-checkbox>
                </sui-grid-column>
              </sui-grid-row>
            </sui-grid>
            <sui-grid-row>
              <sui-grid-column :width="15">
                <label>Conditions d'obtentions: </label>
                <sui-input name="descTrophy" :value="TrophyDescription" :size="25"/>
              </sui-grid-column>
            </sui-grid-row>
            <sui-grid-row >
              <sui-grid-column >
                <sui-checkbox label="Visible" toggle v-model="visible"/>
              </sui-grid-column>
            </sui-grid-row>
            <sui-grid-row>
              <sui-grid-column>
                <datepicker class="ui input" v-show="visible" :monday-first="true" :language="fr" :full-month-name="true"></datepicker>
              </sui-grid-column>
            </sui-grid-row>
            <sui-grid-row>
              <sui-grid-column>
                <sui-checkbox label="vote" toggle v-model="vote"/>
              </sui-grid-column>
            </sui-grid-row>
            <sui-grid-row>
              <sui-grid-column>
                <datepicker v-show="vote" :monday-first="true" :language="fr" :full-month-name="true"></datepicker>
              </sui-grid-column>
            </sui-grid-row>
          </sui-grid>
        <sui-modal-actions>
          <sui-button positive>Créer</sui-button>
          <sui-button negative @click.native="toggle">Annuler</sui-button>
        </sui-modal-actions>
      </sui-modal>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import {fr} from 'vuejs-datepicker/dist/locale'
import SuiGrid from 'semantic-ui-vue/dist/commonjs/collections/Grid/Grid'
import SuiGridRow from 'semantic-ui-vue/dist/commonjs/collections/Grid/GridRow'
import SuiGridColumn from 'semantic-ui-vue/dist/commonjs/collections/Grid/GridColumn'
export default {
  name: 'CreateTrophy',
  components: { SuiGridColumn, SuiGridRow, SuiGrid, Datepicker },
  data () {
    return {
      open: false,
      vote: false,
      visible: true,
      current: null,
      fr: fr,
      TrophyDescription: '',
      TrophyName: '',
      TrophyValue: '',
      selectedModule: []
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
div{
    font-family: 'Lato';
}
#img{
    zoom: 20%;
    -moz-transform: scale(0.35);
}
#exception{
    margin: 0px;
}

.ui.grid {
  margin: 1%
}
</style>
