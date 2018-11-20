<template>
    <div>
        <h2 is="sui-header">Mes trophées :</h2>
        <sui-container>
            <sui-table unstackable>
                <sui-table-header>
                    <sui-table-row>
                        <sui-table-header-cell>Nom</sui-table-header-cell>
                        <sui-table-header-cell>Valeur</sui-table-header-cell>
                        <sui-table-header-cell>Votes</sui-table-header-cell>
                        <sui-table-header-cell>Obtenu</sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>
                <sui-table-body>
                    <sui-table-row v-for="trophy in trophies" :key="trophy.nom">
                        <sui-table-cell>{{trophy.nom}}</sui-table-cell>
                        <sui-table-cell>{{trophy.valeur}}</sui-table-cell>
                        <sui-table-cell><vote v-if="trophy.vote"/></sui-table-cell>
                        <sui-table-cell><i class="check icon" v-if="trophy.obtenu"></i></sui-table-cell>
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
        </sui-container>
    </div>
</template>

<script>
// TODO : doit permettre de trier les trophées par niveau, par module et par date

import vote from '@/components/vote'

export default {

  components: {vote},

  data () {
    return {
      trophies: [
        {
          nom: 'Toujours présent',
          valeur: 'bronze',
          vote: false,
          obtenu: true
        },
        {
          nom: 'Toujours prêt',
          valeur: 'or',
          vote: true,
          obtenu: false
        },
        {
          nom: 'Toujours prêt',
          valeur: 'or',
          vote: true,
          obtenu: true
        }
      ]
    }
  }

}
</script>

<style>

</style>
