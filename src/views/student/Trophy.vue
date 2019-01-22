<template>
    <div>
      <h3 is="sui-header">View Trophy and Vote : {{infosTrophee[0].titre}}</h3>
      <sui-grid>
        <sui-grid-row>
          <sui-grid-column :width="2">{{infosTrophee[0].numod}}</sui-grid-column>
          <sui-grid-column :width="1">{{infosTrophee[0].type}}</sui-grid-column>
          <sui-grid-column :width="4">{{infosTrophee[0].description}}</sui-grid-column>
          <sui-grid-column :width="1">{{infosTrophee[0].vote}}</sui-grid-column>
        </sui-grid-row>
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
  mounted () {
    axios.get(global.API + '/trophy/' + this.$session.get('user_account'))
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
