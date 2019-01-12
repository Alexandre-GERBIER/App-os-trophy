<template>
    <div>
      <h3 is="sui-header">View Trophy and Vote <!--{{infosTrophee.nom}}{{ $route.params.nutroph}}--></h3>
      <sui-table>
        <sui-table-row>
          <sui-table-cell><!--{{infoTrophee.numod}}--></sui-table-cell>
          <sui-table-cell><!--{{infoTrophee.type}}--></sui-table-cell>
          <sui-table-cell><!--{{infoTrophee.description}}--></sui-table-cell>
          <sui-table-cell><!--{{infoTrophee.vote}}--></sui-table-cell>
          <sui-table-cell><!--{{infoTrophee.nom}}--></sui-table-cell>
        </sui-table-row>
      </sui-table>
    </div>
</template>

<script>

// import axios from 'axios'

// TODO : la route a en paramètre l'id du trophée
export default {

  data () {
    return {
      infosTrophee: []
    }
  }
  /* mounted () {
    axios.get(global.API + '/trophy/1')
      .then(response => {
        this.infosTrophee = response.data
        console.log(response.data)
      })
      .catch(e => {
        this.errors.push(e)
      })
  } */
}
</script>

<style>

</style>
