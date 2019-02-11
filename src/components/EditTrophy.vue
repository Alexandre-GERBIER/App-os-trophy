<template>
  <div id="boutonTrophy">
    <sui-button @click.native="toggle">Éditer un trophée</sui-button>
    <sui-modal v-model="open">
      <sui-modal-header>éditer un trophée : {{ trophy[0].titre }} </sui-modal-header>
      <form class="ui grid">
        <div class="four wide column">
          <sui-image v-if="trophy[0].type === 'platine'" label="imageTrophy" src="/static/images/imageTropheePlatine.png" size="tiny" />
            <sui-image v-else-if="trophy[0].type === 'or'" label="imageTrophy" src="/static/images/imageTropheeOr.png" size="tiny" />
            <sui-image v-else-if="trophy[0].type === 'argent'" label="imageTrophy" src="/static/images/imageTropheeArgent.png" size="tiny" />
            <sui-image v-else-if="trophy[0].type === 'bronze'" label="imageTrophy" src="/static/images/imageTropheeBronze.png" size="tiny" />
        </div>
        <div class="six wide column">
          <label> Titre :  </label>
          {{ trophy[0].titre }}
        </div>
        <div class="six wide column">
          Modules : {{ trophy[0].numod}}
        </div>
        <div class="four wide column">
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
        <div class="six wide column">
          <label> Conditions d'obtentions: </label>
          <sui-input name="descTrophy" :value="trophy[0].description"/>
        </div>
        <div class="six wide column">
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
  </div>
</template>
<!--
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vuejs-datepicker"></script>
-->

<script>
import Datepicker from 'vuejs-datepicker'
import axios from 'axios'
import {fr} from 'vuejs-datepicker/dist/locale'
import global from '@/globals.json'

export default {
  name: 'EditTrophy',
  components: { Datepicker },
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
      TrophyDescription: '',
      trophy: {},
      // TrophyName: 'Mon Trophée',
      TrophyValue: 'platine',
      textModule: [
        {key: 'M3310', text: 'M3310 maths', value: 'M3310 maths'},
        {key: 'M3315', text: 'M3315 algèbre', value: 'M3315 algèbre'},
        {key: 'M1111', text: 'M1111 modélisation de données', value: 'M1111 modélisation de données'}
      ],
      selectedModules: []
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
        console.log(this.trophy)
      })
      .catch(e => {
        this.errors.push(e)
        console.log(this.errors)
      })
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
