<template>
    <div>
      <h2 is="sui-header" class="centered">Trophée : {{infosTrophee[0].titre}}</h2>
      <sui-divider hidden/>
      <sui-grid class="centered">
        <sui-container>
          <sui-table unstackable definition>
            <sui-table-body>
                <sui-table-row>
                  <sui-table-cell>Numero de module</sui-table-cell>
                  <sui-table-cell>{{infosTrophee[0].numod}}</sui-table-cell>
                </sui-table-row>
                <sui-table-row>
                  <sui-table-cell>Valeur</sui-table-cell>
                  <sui-table-cell><img width=40 height=40 :src="'/static/images/imageTrophee' + infosTrophee[0].type.charAt(0).toUpperCase() + infosTrophee[0].type.slice(1) + '.png'" /></sui-table-cell>
                </sui-table-row>
                <sui-table-row>
                  <sui-table-cell>Description</sui-table-cell>
                  <sui-table-cell>{{infosTrophee[0].description}}</sui-table-cell>
                </sui-table-row>
                <sui-table-row v-if="infosTrophee[0].vote == 1">
                  <sui-table-cell>Votable</sui-table-cell>
                  <sui-table-cell positive><sui-icon name="check"/></sui-table-cell>
                </sui-table-row>
                <sui-table-row v-else>
                  <sui-table-cell>Votable</sui-table-cell>
                  <sui-table-cell negative><sui-icon name="close"/></sui-table-cell>
                </sui-table-row>
            </sui-table-body>
          </sui-table>
        </sui-container>
      </sui-grid>
    </div>
</template>

<script>

import axios from 'axios'
import global from '@/globals.json'

// TODO : la route a en paramètre l'id du trophée
export default {

  data () {
    return {
      infosTrophee: []
    }
  },
  methods () {

  },
  mounted () {
    axios.get(global.API + '/trophy/' + this.$route.params.nutroph)
      .then(response => {
        this.infosTrophee = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<style>

</style>
