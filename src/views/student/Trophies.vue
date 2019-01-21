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
                        <!--<sui-table-header-cell v-on:click="sorted_obtenu">Obtenu <i class="sort icon" :class="(ordreObtenu != 0) ? ((ordreObtenu == 1) ? 'down': 'up'): ''"></i></sui-table-header-cell> -->
                        <!-- <sui-table-header-cell text-align="right">Informations</sui-table-header-cell> -->
                    </sui-table-row>
                </sui-table-header>
                <sui-table-body>
                    <sui-table-row v-for="trophy in mesTrophees" :key="trophy.nutroph">
                        <sui-table-cell><router-link :to="'/student/trophy/' + trophy.nutroph">{{trophy.titre}}</router-link></sui-table-cell>
                        <sui-table-cell>{{trophy.numod}}</sui-table-cell>
                        <sui-table-cell>{{trophy.datevisible}}</sui-table-cell>
                        <sui-table-cell><img width=40 height=40 :src="'/static/images/imageTrophee' + trophy.type.charAt(0).toUpperCase() + trophy.type.slice(1) + '.png'" /></sui-table-cell>
                        <sui-table-cell><vote v-if="trophy.vote == 1"/></sui-table-cell>
                       <!-- <sui-table-cell><i class="check icon" v-if="trophy.obtenu"></i></sui-table-cell> -->
                        <!-- <sui-table-cell text-align="right">voir les détails du trophée</sui-table-cell> -->
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
        </sui-container>
    </div>
</template>

<script>
// TODO : doit permettre de trier les trophées par niveau, par module et par date

import axios from 'axios'
import vote from '@/components/vote'
import global from '@/globals.json'

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
      mesTrophees: {},
      errors: []
      /*  trophies: [
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
      ] */
    }
  },

  mounted () {
    axios.get(global.API + '/trophy/student/E175119X')
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
    },
    sorted_nom () {
      if (this.ordreNom === 0 || this.ordreNom === -1) {
        this.mesTrophees.sort((a, b) => {
          return a.titre.localeCompare(b.titre)
        })
        this.reset_sorted()
        this.ordreNom = 1
      } else {
        this.mesTrophees.sort((a, b) => {
          return b.titre.localeCompare(a.titre)
        })
        this.reset_sorted()
        this.ordreNom = -1
      }
    },
    sorted_module () {
      if (this.ordreModule === 0 || this.ordreModule === -1) {
        this.mesTrophees.sort((a, b) => {
          return a.numod.localeCompare(b.numod)
        })
        this.reset_sorted()
        this.ordreModule = 1
      } else {
        this.mesTrophees.sort((a, b) => {
          return b.numod.localeCompare(a.numod)
        })
        this.reset_sorted()
        this.ordreModule = -1
      }
    },
    sorted_date () {
      if (this.ordreDate === 0 || this.ordreDate === -1) {
        this.mesTrophees.sort((a, b) => {
          return a.datevisible.localeCompare(b.datevisible)
        })
        this.reset_sorted()
        this.ordreDate = 1
      } else {
        this.mesTrophees.sort((a, b) => {
          return b.datevisible.localeCompare(a.datevisible)
        })
        this.reset_sorted()
        this.ordreDate = -1
      }
    },
    sorted_valeur () {
      if (this.ordreValeur === 0 || this.ordreValeur === -1) {
        this.mesTrophees.sort((a, b) => {
          a = a.type
          b = b.type
          return this.sortingArr.indexOf(b) - this.sortingArr.indexOf(a)
        })
        this.reset_sorted()
        this.ordreValeur = 1
      } else {
        this.mesTrophees.sort((a, b) => {
          a = a.type
          b = b.type
          return this.sortingArr.indexOf(a) - this.sortingArr.indexOf(b)
        })
        this.reset_sorted()
        this.ordreValeur = -1
      }
    },
    sorted_vote () {
      if (this.ordreVote === 0 || this.ordreVote === -1) {
        this.mesTrophees.sort((a, b) => {
          return a.vote - b.vote
        })
        this.reset_sorted()
        this.ordreVote = 1
      } else {
        this.mesTrophees.sort((a, b) => {
          return b.vote - a.vote
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
