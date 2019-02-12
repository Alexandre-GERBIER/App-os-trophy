<template>
    <div id="boutonTrophy">
        <sui-button class="green" @click.native="toggle" content="Nouveau  trophée" icon="plus"/>
        <sui-modal v-model="open" id="big_popup">
        <sui-modal-header>Créer un trophée : {{ TrophyName }}</sui-modal-header>
        <form class="ui grid">
          <div class="four wide column">
            <sui-image v-if="TrophyValue === 'platine'" label="imageTrophy" src="/static/images/imageTropheePlatine.png" size="tiny" />
            <sui-image v-else-if="TrophyValue === 'or'" label="imageTrophy" src="/static/images/imageTropheeOr.png" size="tiny" />
            <sui-image v-else-if="TrophyValue === 'argent'" label="imageTrophy" src="/static/images/imageTropheeArgent.png" size="tiny" />
            <sui-image v-else-if="TrophyValue === 'bronze'" label="imageTrophy" src="/static/images/imageTropheeBronze.png" size="tiny" />
          </div>
          <div class="six wide column">
              <label> Titre :  </label>
              <sui-input name="TrophyName" v-model="TrophyName"/>
          </div>
          <div class="five wide column">
                <label> Module : </label> {{ $route.params.reference }} - {{name}}
          </div>
          <div class="four wide column">
              <label>  Valeur du trophée :</label>
              <br>
              <sui-form-field>
                <sui-checkbox name="TrophyValue" label="platine" radio value="platine" v-model="TrophyValue"/>
              </sui-form-field>
              <br>
              <sui-form-field>
                <sui-checkbox name="TrophyValue" label="or" radio value="or" v-model="TrophyValue"/>
              </sui-form-field>
              <br>
              <sui-form-field>
                <sui-checkbox name="TrophyValue" label="argent" radio value="argent" v-model="TrophyValue"/>
              </sui-form-field>
              <br>
              <sui-form-field>
                <sui-checkbox name="TrophyValue" label="bronze" radio value="bronze" v-model="TrophyValue"/>
              </sui-form-field>
          </div>
          <div class="six wide column">
              <label> Conditions d'obtentions: </label>
              <sui-input name="descTrophy" :value="TrophyDescription"/>
          </div>
          <div class="six wide column">
              <sui-checkbox label="Visible" toggle v-model="visible"/>
              <br> <br>
              <datepicker class="ui input" v-show="visible" :monday-first="true" :language="fr" :full-month-name="true"></datepicker>
              <br> <br>
              <sui-checkbox label="vote" toggle v-model="vote"/>
              <br> <br>
              <datepicker v-show="vote" :monday-first="true" :language="fr" :full-month-name="true"></datepicker>
          </div>
        </form>
            <sui-modal-actions>
                <sui-button positive>Créer</sui-button>
                <sui-button negative @click.native="toggle">Annuler</sui-button>
            </sui-modal-actions>
        </sui-modal>
      <sui-modal v-model="open" id="small_popup">
        <sui-modal-header>
          Créer un trophée : {{ TrophyName }} <br>
          Module : {{ $route.params.reference }}  {{name}}
        </sui-modal-header>
        <form>
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
            <sui-grid-row>
              <sui-grid-column :width="six">
                <label> Conditions d'obtentions: </label>
                <sui-input name="descTrophy" :value="TrophyDescription" :size="25"/>
              </sui-grid-column>
            </sui-grid-row>
            <sui-grid-row >
              <sui-grid-column :width="six"> Valeur du trophée : </sui-grid-column>
            </sui-grid-row >
            <sui-grid-row >
              <sui-grid-column :width="3"></sui-grid-column>
              <sui-grid-column :width="5">
              <sui-form-field>
                <sui-checkbox name="TrophyValue" label="platine" radio value="platine" v-model="TrophyValue"/>
              </sui-form-field>
              </sui-grid-column>
              <sui-grid-column :width="5" >
              <sui-form-field>
                <sui-checkbox name="TrophyValue" label="or" radio value="or" v-model="TrophyValue"/>
              </sui-form-field>
              </sui-grid-column>
              <sui-grid-column :width="15"></sui-grid-column>
              <sui-grid-column :width="3"></sui-grid-column>
              <sui-grid-column :width="5" >
              <sui-form-field>
                <sui-checkbox name="TrophyValue" label="argent" radio value="argent" v-model="TrophyValue"/>
              </sui-form-field>
            </sui-grid-column>
              <sui-grid-column :width="5" >
              <sui-form-field>
                <sui-checkbox name="TrophyValue" label="bronze" radio value="bronze" v-model="TrophyValue"/>
              </sui-form-field>
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
        </form>
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
  components: {SuiGridColumn, SuiGridRow, SuiGrid, Datepicker },
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
      textModule: [
        {key: 'M3310', text: 'M3310 maths', value: 'M3310 maths'},
        {key: 'M3315', text: 'M3315 algèbre', value: 'M3315 algèbre'},
        {key: 'M1111', text: 'M1111 modélisation de données', value: 'M1111 modélisation de données'}
      ],
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
  @media (max-width: 700px) {
    #big_popup {
      display: none;
    }
  }

  @media (min-width: 701px) {
    #small_popup {
      display: none;
    }
  }
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
</style>
