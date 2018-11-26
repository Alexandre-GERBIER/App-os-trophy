<template>
    <div>
        <h2 is="sui-header">Module {{ $route.params.id }} - {{name}} </h2>
        <sui-grid class="centered">
                <sui-grid-column :width="8">
                    <sui-divider fitted/>
                    <p>Enseignant responsable : <b>{{ teacher }}</b></p>
                    <p>Nombre d'étudiants inscrits au module : <b>{calculer}</b></p>
                    <sui-divider hidden/>
                    <sui-divider hidden/>

                    <h3 is="sui-header">Trophées ( {calculer} disponibles )</h3>
                    <sui-container>
                    <sui-table unstackable>
                      <sui-table-header>
                          <sui-table-row>
                              <sui-table-header-cell>Nom</sui-table-header-cell>
                              <sui-table-header-cell>Valeur</sui-table-header-cell>
                              <sui-table-header-cell>Vote</sui-table-header-cell>
                              <sui-table-header-cell>Délivrer</sui-table-header-cell>
                              <sui-table-header-cell text-align="right">Informations</sui-table-header-cell>
                          </sui-table-row>
                      </sui-table-header>
                      <sui-table-body>
                          <sui-table-row v-for="trophy in trophies" :key="trophy.nom">
                              <sui-table-cell>{{trophy.nom}}</sui-table-cell>
                              <sui-table-cell>{{trophy.valeur}}</sui-table-cell>
                              <sui-table-cell ><i class="check icon" v-if="!trophy.vote" ></i></sui-table-cell>
                              <sui-table-cell ><DeliverTrophy/></sui-table-cell>
                              <sui-table-cell text-align="right"><router-link :to="'/student/trophy/' + trophy.id">éditer le trophée</router-link></sui-table-cell>
                          </sui-table-row>
                      </sui-table-body>
                    </sui-table>
                  </sui-container>
                </sui-grid-column>
        </sui-grid>
    </div>
</template>

<script>

import DeliverTrophy from '@/components/DeliverTrophy'

export default {

  components: {DeliverTrophy},

  data () {
    return {
      id: 'M3101',
      name: 'Bases de données avancées',
      teacher: 'John Doe',
      trophies: [
        {
          id: '1',
          nom: 'Toujours présent',
          valeur: 'bronze',
          vote: false
        },
        {
          id: '2',
          nom: 'Toujours prêt',
          valeur: 'or',
          vote: true
        },
        {
          id: '3',
          nom: 'Toujours debout',
          valeur: 'platine',
          vote: true
        }
      ]
    }
  }
}
</script>

<style>

</style>
