<template>
    <div>
        <h2 is="sui-header">Mes trophées</h2>
        <sui-container>
            <sui-table color="yellow" unstackable class="tab_trophies_big">
                <sui-table-header class="table_header">
                    <sui-table-row>
                        <sui-table-header-cell v-on:click="sorted_nom">Nom <i class="sort icon" :class="(ordreNom != 0) ? ((ordreNom == 1) ? 'down': 'up'): ''"></i></sui-table-header-cell>
                        <sui-table-header-cell v-on:click="sorted_module">Module <i class="sort icon" :class="(ordreModule != 0) ? ((ordreModule == 1) ? 'down': 'up'): ''"></i></sui-table-header-cell>
                        <sui-table-header-cell v-on:click="sorted_date">Date <i class="sort icon" :class="(ordreDate != 0) ? ((ordreDate == 1) ? 'down': 'up'): ''"></i></sui-table-header-cell>
                        <sui-table-header-cell v-on:click="sorted_valeur">Valeur <i class="sort icon" :class="(ordreValeur != 0) ? ((ordreValeur == 1) ? 'down': 'up'): ''"></i></sui-table-header-cell>
                        <sui-table-header-cell v-on:click="sorted_vote">Votes <i class="sort icon" :class="(ordreVote != 0) ? ((ordreVote == 1) ? 'down': 'up'): ''"></i></sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>
                <sui-table-body>
                    <sui-table-row v-for="trophy in mesTrophees" :key="trophy.nutroph">
                        <sui-table-cell><router-link :to="'/student/trophy/' + trophy.nutroph">{{trophy.titre}}</router-link></sui-table-cell>
                        <sui-table-cell>{{trophy.numod}}</sui-table-cell>
                        <sui-table-cell>{{trophy.datevisible}}</sui-table-cell>
                        <sui-table-cell><img width=40 height=40 :src="'../../static/images/imageTrophee' + trophy.type.charAt(0).toUpperCase() + trophy.type.slice(1) + '.png'" /></sui-table-cell>
                        <sui-table-cell><vote :id="trophy.nutroph" :name="trophy.titre" :numod="trophy.numod" v-if="trophy.vote == 1"/></sui-table-cell>
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
        </sui-container>

        <sui-container>
            <sui-table color="yellow" unstackable class="tab_trophies_small">
                <sui-table-header class="table_header">
                    <sui-table-row>
                        <sui-table-header-cell v-on:click="sorted_nom">Nom <i class="sort icon" :class="(ordreNom != 0) ? ((ordreNom == 1) ? 'down': 'up'): ''"></i></sui-table-header-cell>
                        <!-- <sui-table-header-cell v-on:click="sorted_module">Module <i class="sort icon" :class="(ordreModule != 0) ? ((ordreModule == 1) ? 'down': 'up'): ''"></i></sui-table-header-cell>
                        <sui-table-header-cell v-on:click="sorted_date">Date <i class="sort icon" :class="(ordreDate != 0) ? ((ordreDate == 1) ? 'down': 'up'): ''"></i></sui-table-header-cell> -->
                        <sui-table-header-cell v-on:click="sorted_valeur">Valeur <i class="sort icon" :class="(ordreValeur != 0) ? ((ordreValeur == 1) ? 'down': 'up'): ''"></i></sui-table-header-cell>
                        <sui-table-header-cell v-on:click="sorted_vote">Votes <i class="sort icon" :class="(ordreVote != 0) ? ((ordreVote == 1) ? 'down': 'up'): ''"></i></sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>
                <sui-table-body>
                    <sui-table-row v-for="trophy in mesTrophees" :key="trophy.nutroph">
                        <sui-table-cell :width="3"><router-link :to="'/student/trophy/' + trophy.nutroph">{{trophy.titre}}</router-link></sui-table-cell>
                        <!-- <sui-table-cell>{{trophy.numod}}</sui-table-cell>
                        <sui-table-cell>{{trophy.datevisible}}</sui-table-cell> -->
                        <sui-table-cell :width="2"><img width=40 height=40 :src="'../../static/images/imageTrophee' + trophy.type.charAt(0).toUpperCase() + trophy.type.slice(1) + '.png'" /></sui-table-cell>
                        <sui-table-cell :width="2"><vote :id="trophy.nutroph" :name="trophy.titre" :numod="trophy.numod" v-if="trophy.vote == 1"/></sui-table-cell>
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
        </sui-container>
        <div v-if="chargement" class="ui active dimmer">
          <div class="ui indeterminate text loader">Chargement ...</div>
        </div>
    </div>
</template>

<script>

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
      errors: [],
      chargement: true
    }
  },

  mounted () {
    let promesse = []
    promesse.push(axios.get(global.API + '/trophy/student/' + this.$session.get('user_account'))
      .then(response => {
        this.mesTrophees = response.data
      })
      .catch(e => {
        this.errors.push(e)
      }))
    Promise.all(promesse).then(() => {
      this.chargement = false
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

  @media (max-width: 700px) {
    .tab_trophies_big {
      display: none;
    }
  }

  @media (min-width: 701px) {
    .tab_trophies_small {
      display: none;
    }
  }
</style>
