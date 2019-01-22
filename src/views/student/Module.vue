<template>
    <div>
        <h2 is="sui-header">Module {{ $route.params.reference }} - {{name}} </h2>
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
                              <sui-table-header-cell>Votes</sui-table-header-cell>
                              <sui-table-header-cell>Obtenu</sui-table-header-cell>
                              <sui-table-header-cell text-align="right">Informations</sui-table-header-cell>
                          </sui-table-row>
                      </sui-table-header>
                      <sui-table-body>
                          <sui-table-row v-for="trophy in trophies" :key="trophy.nom">
                              <sui-table-cell>{{trophy.nom}}</sui-table-cell>
                              <sui-table-cell>{{trophy.valeur}}</sui-table-cell>
                              <sui-table-cell ><vote class="check icon" v-if="!trophy.vote" /></sui-table-cell>
                              <sui-table-cell ><i class="check icon" v-if="trophy.obtenu"></i></sui-table-cell>
                              <sui-table-cell text-align="right"><router-link :to="'/student/trophy/' + trophy.nutroph">voir les détails du trophée</router-link></sui-table-cell>
                          </sui-table-row>
                      </sui-table-body>
                    </sui-table>
                  </sui-container>
                </sui-grid-column>
        </sui-grid>
    </div>
</template>

<script>
// TODO : popup pour afficher les trophées disponibles
import vote from '@/components/vote'

export default {

  components: {vote},

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
          vote: false,
          obtenu: true
        },
        {
          id: '2',
          nom: 'Toujours prêt',
          valeur: 'or',
          vote: true,
          obtenu: false
        }
      ]
    }
  }
}
</script>

<style>

</style>
