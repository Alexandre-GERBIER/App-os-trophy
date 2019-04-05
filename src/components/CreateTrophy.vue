<template>
    <div id="boutonTrophy">
      <sui-button class="green" @click.native="toggle" icon="plus"> Nouveau trophée</sui-button>
      <sui-modal v-model="open" id="small_popup">
        <sui-modal-header>
          Créer un trophée : {{ TrophyName }} <br>
          Module : {{ $route.params.reference }}
        </sui-modal-header>
        <sui-modal-content scrolling>
          <sui-grid>
            <sui-grid-row>
              <sui-grid-column :width="5">
                <sui-image v-if="TrophyValue === 'platine'" label="imageTrophy" src="/static/images/imageTropheePlatine.png" size="tiny"></sui-image>
                <sui-image v-else-if="TrophyValue === 'or'" label="imageTrophy" src="/static/images/imageTropheeOr.png" size="tiny"></sui-image>
                <sui-image v-else-if="TrophyValue === 'argent'" label="imageTrophy" src="/static/images/imageTropheeArgent.png" size="tiny"></sui-image>
                <sui-image v-else-if="TrophyValue === 'bronze'" label="imageTrophy" src="/static/images/imageTropheeBronze.png" size="tiny"></sui-image>
              </sui-grid-column>
              <sui-grid-column :width="10">
                <label> Titre :  </label>
                <sui-input name="TrophyName" v-model="TrophyName" :size="15"></sui-input>
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
                <sui-input name="descTrophy" v-model="TrophyDescription" :size="25"></sui-input>
              </sui-grid-column>
            </sui-grid-row>
            <sui-grid-row >
              <sui-grid-column >
                <sui-checkbox label="Visible" toggle v-model="visible"></sui-checkbox>
              </sui-grid-column>
            </sui-grid-row>
            <sui-grid-row>
              <sui-grid-column>
                <datepicker class="ui input" v-show="visible" :monday-first="true" :language="fr" :full-month-name="true" :format="customFormatterVisible"></datepicker>
              </sui-grid-column>
            </sui-grid-row>
            <sui-grid-row>
              <sui-grid-column>
                <sui-checkbox label="vote" toggle v-model="vote"></sui-checkbox>
              </sui-grid-column>
            </sui-grid-row>
            <sui-grid-row>
              <sui-grid-column>
                <datepicker v-show="vote" :monday-first="true" :language="fr" :full-month-name="true" :format="customFormatterVote"></datepicker>
              </sui-grid-column>
            </sui-grid-row>
          </sui-grid>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button positive @click="envoieTrophee">Créer</sui-button>
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
import axios from 'axios'
import global from '@/globals.json'
import moment from 'moment'

export default {
  name: 'CreateTrophy',
  components: { SuiGridColumn, SuiGridRow, SuiGrid, Datepicker },
  data () {
    return {
      open: false,
      current: null,
      fr: fr,
      selectedModule: [],
      TrophyDescription: '',
      TrophyName: '',
      TrophyValue: '',
      vote: false,
      visible: false,
      datevisible: '',
      datevote: ''
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
    },
    customFormatterVisible (date) {
      this.datevisible = moment(date).format()
      this.datevisible = this.datevisible.replace('T', ' ').split('+')[0]
      return moment(date).format('MMM Do YY')
    },
    customFormatterVote (date) {
      this.datevote = moment(date).format()
      this.datevote = this.datevote.replace('T', ' ').split('+')[0]
      return moment(date).format('MMM Do YY')
    },
    envoieTrophee () {
      console.log('datevisible: ' + this.datevisible)
      console.log('datevote: ' + this.datevote)
      axios.post(global.API + '/trophy', {
        numod: this.$route.params.reference,
        vote: (this.vote ? 1 : 0),
        visible: (this.visible ? 1 : 0),
        datevisible: this.datevisible,
        datevote: this.datevote,
        titre: this.TrophyName,
        type: this.TrophyValue,
        description: this.TrophyDescription
      })
        .then((res) => {
          this.toggle()
          window.alert('Votre trophée a bien été crée !')
          this.TrophyDescription = ''
          this.TrophyName = ''
          this.TrophyValue = ''
          this.vote = false
          this.visible = false
          this.datevisible = ''
          this.datevote = ''
        })
        .catch((err) => {
          window.alert('Votre trophée n\'a pas pu être crée à cause de l\'erreur suivante : ' + err)
        })
    }
  }
}
</script>

<style>

div {
  font-family: 'Lato',serif;
}
</style>
