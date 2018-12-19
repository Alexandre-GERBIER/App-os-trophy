<template>
    <div>
        <h2 is="sui-header">Mes trophées :</h2>
        <sui-container>
            <sui-table unstackable>
                <sui-table-header class="table_header">
                    <sui-table-row>
                        <sui-table-header-cell v-on:click="sorted_nom">Nom <i class="sort icon" :class="(ordreNom != 0) ? ((ordreNom == 1) ? 'down': 'up'): ''"></i></sui-table-header-cell>
                        <sui-table-header-cell v-on:click="sorted_module">Module <i class="sort icon" :class="(ordreModule != 0) ? ((ordreModule == 1) ? 'down': 'up'): ''"></i></sui-table-header-cell>
                        <sui-table-header-cell v-on:click="sorted_date">Date <i class="sort icon" :class="(ordreDate != 0) ? ((ordreDate == 1) ? 'down': 'up'): ''"></i></sui-table-header-cell>
                        <sui-table-header-cell v-on:click="sorted_valeur">Valeur <i class="sort icon" :class="(ordreValeur != 0) ? ((ordreValeur == 1) ? 'down': 'up'): ''"></i></sui-table-header-cell>
                        <sui-table-header-cell v-on:click="sorted_vote">Votes <i class="sort icon" :class="(ordreVote != 0) ? ((ordreVote == 1) ? 'down': 'up'): ''"></i></sui-table-header-cell>
                        <sui-table-header-cell v-on:click="sorted_obtenu">Obtenu <i class="sort icon" :class="(ordreObtenu != 0) ? ((ordreObtenu == 1) ? 'down': 'up'): ''"></i></sui-table-header-cell>
                        <sui-table-header-cell text-align="right">Informations</sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>
                <sui-table-body>
                    <sui-table-row v-for="trophy in mesTrophees" :key="trophy.nutroph">
                        <sui-table-cell>{{trophy.titre}}</sui-table-cell>
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
      sortingArr: ['platine', 'or', 'argent', 'bronze'],
      ordreNom: 0,
      ordreModule: 0,
      ordreDate: 0,
      ordreValeur: 0,
      ordreVote: 0,
      ordreObtenu: 0,
      mesTrophees: {},
      /*trophies: [
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
          valeur: 'platine',
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
      ]*/
    }
  },

  mounted () {
    axios.get(global.API + '/user/trophy/9')
      .then(response => {
        this.mesTrophees = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },

  methods: {

    reset_sorted () {
      this.ordreNom = 0
      this.ordreModule = 0
      this.ordreDate = 0
      this.ordreValeur = 0
      this.ordreVote = 0
      this.ordreObtenu = 0
    },
    sorted_nom () {
      if (this.ordreNom === 0 || this.ordreNom === -1) {
        this.trophies.sort((a, b) => {
          return a.nom.localeCompare(b.nom)
        })
        this.reset_sorted()
        this.ordreNom = 1
      } else {
        this.trophies.sort((a, b) => {
          return b.nom.localeCompare(a.nom)
        })
        this.reset_sorted()
        this.ordreNom = -1
      }
    },
    sorted_module () {
      if (this.ordreModule === 0 || this.ordreModule === -1) {
        this.trophies.sort((a, b) => {
          return a.module.localeCompare(b.module)
        })
        this.reset_sorted()
        this.ordreModule = 1
      } else {
        this.trophies.sort((a, b) => {
          return b.module.localeCompare(a.module)
        })
        this.reset_sorted()
        this.ordreModule = -1
      }
    },
    sorted_date () {
      if (this.ordreDate === 0 || this.ordreDate === -1) {
        this.trophies.sort((a, b) => {
          return a.date.localeCompare(b.date)
        })
        this.reset_sorted()
        this.ordreDate = 1
      } else {
        this.trophies.sort((a, b) => {
          return b.date.localeCompare(a.date)
        })
        this.reset_sorted()
        this.ordreDate = -1
      }
    },
    sorted_valeur () {
      if (this.ordreValeur === 0 || this.ordreValeur === -1) {
        this.trophies.sort((a, b) => {
          a = a.valeur
          b = b.valeur
          return this.sortingArr.indexOf(b) - this.sortingArr.indexOf(a)
        })
        this.reset_sorted()
        this.ordreValeur = 1
      } else {
        this.trophies.sort((a, b) => {
          a = a.valeur
          b = b.valeur
          return this.sortingArr.indexOf(a) - this.sortingArr.indexOf(b)
        })
        this.reset_sorted()
        this.ordreValeur = -1
      }
    },
    sorted_obtenu () {
      if (this.ordreObtenu === 0 || this.ordreObtenu === -1) {
        this.trophies.sort((a, b) => {
          return (a.obtenu === b.obtenu) ? 0 : a.obtenu ? -1 : 1
        })
        this.reset_sorted()
        this.ordreObtenu = 1
      } else {
        this.trophies.sort((a, b) => {
          return (a.obtenu === b.obtenu) ? 0 : a.obtenu ? 1 : -1
        })
        this.reset_sorted()
        this.ordreObtenu = -1
      }
    },
    sorted_vote () {
      if (this.ordreVote === 0 || this.ordreVote === -1) {
        this.trophies.sort((a, b) => {
          return (a.vote === b.vote) ? 0 : a.vote ? -1 : 1
        })
        this.reset_sorted()
        this.ordreVote = 1
      } else {
        this.trophies.sort((a, b) => {
          return (a.vote === b.vote) ? 0 : a.vote ? 1 : -1
        })
        this.reset_sorted()
        this.ordreVote = -1
      }
    }
  }

}
</script>

<style>
.table_header {
  user-select: none;
}
</style>
