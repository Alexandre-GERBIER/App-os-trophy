<template>
    <div>
        <h2 is="sui-header">Mes trophées :</h2>
        <sui-container>
            <sui-table unstackable>
                <sui-table-header>
                    <sui-table-row>
                        <sui-table-header-cell v-on:click="sorted_nom">Nom <i class="sort Descending icon"></i></sui-table-header-cell>
                        <sui-table-header-cell v-on:click="sorted_module">Module <i class="sort Descending icon"></i></sui-table-header-cell>
                        <sui-table-header-cell>Date <i class="sort Descending icon"></i></sui-table-header-cell>
                        <sui-table-header-cell>Valeur <i class="sort Descending icon"></i></sui-table-header-cell>
                        <sui-table-header-cell>Votes <i class="sort Descending icon"></i></sui-table-header-cell>
                        <sui-table-header-cell>Obtenu <i class="sort Descending icon"></i></sui-table-header-cell>
                        <sui-table-header-cell text-align="right">Informations</sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>
                <sui-table-body>
                    <sui-table-row v-for="trophy in trophies" :key="trophy.nom">
                        <sui-table-cell>{{trophy.nom}}</sui-table-cell>
                        <sui-table-cell>{{trophy.module}}</sui-table-cell>
                        <sui-table-cell>{{trophy.date}}</sui-table-cell>
                        <sui-table-cell>{{trophy.valeur}}</sui-table-cell>
                        <sui-table-cell><vote v-if="trophy.vote"/></sui-table-cell>
                        <sui-table-cell><i class="check icon" v-if="trophy.obtenu"></i></sui-table-cell>
                        <sui-table-cell text-align="right"><router-link :to="'/student/trophy/' + trophy.id">voir les détails du trophée</router-link></sui-table-cell>
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
      ordreNom: false,
      ordreModule: false,
      ordreDate: false,
      ordreValeur: false,
      ordreVote: false,
      ordreObtenu: false,
      trophies: [
        {
          id: '1',
          nom: 'Toujours présent',
          module: 'maths',
          date: '21/05/2018',
          valeur: 'bronze',
          vote: false,
          obtenu: true
        },
        {
          id: '2',
          nom: 'Toujours prêt',
          module: 'algo',
          date: '30/10/2018',
          valeur: 'or',
          vote: true,
          obtenu: false
        },
        {
          id: '3',
          nom: 'Toujours debout',
          module: 'bdd',
          date: '08/02/2018',
          valeur: 'or',
          vote: true,
          obtenu: true
        }
      ]
    }
  },
  methods: {
    sorted_nom () {
      if (this.ordreNom === false) {
        this.trophies.sort((a, b) => {
          return a.nom.localeCompare(b.nom)
        })
        this.ordreNom = true
      } else {
        this.trophies.sort((a, b) => {
          return b.nom.localeCompare(a.nom)
        })
        this.ordreNom = false
      }
    },
    sorted_module () {
      if (this.ordreModule === false) {
        this.trophies.sort((a, b) => {
          return a.module.localeCompare(b.module)
        })
        this.ordreModule = true
      } else {
        this.trophies.sort((a, b) => {
          return b.module.localeCompare(a.module)
        })
        this.ordreModule = false
      }
    }
  }

}
</script>

<style>

</style>
