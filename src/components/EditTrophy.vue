<template>
  <div id="boutonTrophy">
    <sui-button floated="left" @click.native="toggle" color="teal" icon="settings"> Éditer</sui-button>
    <sui-modal v-model="open" id="big_popup">
      <sui-modal-header >Éditer le trophée : {{ trophy[0].titre }} </sui-modal-header>
      <form class="ui grid">
        <div class="four wide column">
          <sui-image v-if="trophy[0].type === 'platine'" label="imageTrophy" src="/static/images/imageTropheePlatine.png" size="tiny" />
            <sui-image v-else-if="trophy[0].type === 'or'" label="imageTrophy" src="/static/images/imageTropheeOr.png" size="tiny" />
            <sui-image v-else-if="trophy[0].type === 'argent'" label="imageTrophy" src="/static/images/imageTropheeArgent.png" size="tiny" />
            <sui-image v-else-if="trophy[0].type === 'bronze'" label="imageTrophy" src="/static/images/imageTropheeBronze.png" size="tiny" />
        </div>
        <div class="6 wide column">
          <label> Titre :  </label>
          {{ trophy[0].titre }}
        </div>
        <div class="6 wide column">
          Modules : {{ trophy[0].numod}}
        </div>
        <div class="4 wide column">
          <label>  Valeur du trophée :</label>
          <label>  Valeur du trophée :</label>
          <br>
          <sui-form-field>
            <sui-checkbox name="TrophyValue" :checked="trophy[0].type == 'platine'" label="platine" radio value="platine" v-model="trophy[0].type"/>
          </sui-form-field>
          <br>
          <sui-form-field>
            <sui-checkbox name="TrophyValue" :checked="trophy[0].type == 'or'" label="or" radio value="or" v-model="trophy[0].type"/>
          </sui-form-field>
          <br>
          <sui-form-field>
            <sui-checkbox name="TrophyValue" :checked="trophy[0].type == 'argent'" label="argent" radio value="argent" v-model="trophy[0].type"/>
          </sui-form-field>
          <br>
          <sui-form-field>
            <sui-checkbox name="TrophyValue" :checked="trophy[0].type == 'bronze'" label="bronze" radio value="bronze" v-model="trophy[0].type"/>
          </sui-form-field>
        </div>
        <div class="6 wide column">
          <label> Conditions d'obtentions: </label>
          <sui-input name="descTrophy" :value="trophy[0].description"/>
        </div>
        <div class="6 wide column">
            <sui-checkbox label="Visible" toggle v-model="trophy[0].visible"/>
            <br> <br>
            <datepicker v-show="visible" :monday-first="true" :language="fr" :full-month-name="true"></datepicker>
            <br> <br>
            <sui-checkbox label="vote" toggle v-model="vote"/>
            <br> <br>
            <datepicker v-show="vote" :monday-first="true" :language="fr" :full-month-name="true"></datepicker>
        </div>
      </form>
      <sui-modal-actions>
        <sui-button positive>Éditer</sui-button>
        <sui-button negative @click.native="toggle">Annuler</sui-button>
      </sui-modal-actions>
    </sui-modal>
    <sui-modal v-model="open" id="small_popup">
      <sui-modal-header >éditer un trophée : {{ trophy[0].titre }} </sui-modal-header>
      <form >
        <sui-grid>
          <sui-grid-row>
            <sui-grid-column :width="5" >
              <sui-image v-if="trophy[0].type === 'platine'" label="imageTrophy" src="/static/images/imageTropheePlatine.png" size="tiny" />
              <sui-image v-else-if="trophy[0].type === 'or'" label="imageTrophy" src="/static/images/imageTropheeOr.png" size="tiny" />
              <sui-image v-else-if="trophy[0].type === 'argent'" label="imageTrophy" src="/static/images/imageTropheeArgent.png" size="tiny" />
              <sui-image v-else-if="trophy[0].type === 'bronze'" label="imageTrophy" src="/static/images/imageTropheeBronze.png" size="tiny" />
           </sui-grid-column>
            <sui-grid-column :width="5" >
              <label> Titre :  </label>
              {{ trophy[0].titre }}
            </sui-grid-column>
            <sui-grid-column :width="5" >
              Module : {{ trophy[0].numod}}
            </sui-grid-column>
          </sui-grid-row>
          <sui-grid-row >
            <sui-grid-column :width="6"> Valeur du trophée : </sui-grid-column>
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
          <sui-grid-row>
            <sui-grid-column class="6 wide column">
              <label> Conditions d'obtentions: </label>
              <sui-input name="descTrophy" :value="trophy[0].description" size="25"/>
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
        <sui-button positive>Éditer</sui-button>
        <sui-button negative @click.native="toggle">Annuler</sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import axios from 'axios'
import {fr} from 'vuejs-datepicker/dist/locale'
import global from '@/globals.json'
import SuiGrid from 'semantic-ui-vue/dist/commonjs/collections/Grid/Grid'
import SuiGridRow from 'semantic-ui-vue/dist/commonjs/collections/Grid/GridRow'
import SuiGridColumn from 'semantic-ui-vue/dist/commonjs/collections/Grid/GridColumn'

export default {
  name: 'EditTrophy',
  components: { SuiGridColumn, SuiGridRow, SuiGrid, Datepicker },
  props: {
    id: ''
  },
  data () {
    return {
      errors: [],
      open: false,
      vote: false,
      visible: true,
      current: null,
      fr: fr,
      trophy: {},
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
  },
  mounted () {
    axios.get(global.API + '/trophy/' + this.id)
      .then(res => {
        this.trophy = res.data
      })
      .catch(e => {
        this.errors.push(e)
      })
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
