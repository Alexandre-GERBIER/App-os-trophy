<template>
    <div>
        <h2 is="sui-header">Module {{ $route.params.id }} - {{name}} </h2>
        <sui-grid class="centered">
                <sui-grid-column :width="8">
                    <sui-divider fitted/>
                    <p>Enseignant responsable : {{ teacher }}</p>

                    <sui-divider hidden/>
                    <sui-divider hidden/>

                    <h3 is="sui-header">Trophées</h3>
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
                              <sui-table-cell v-if="!trophy.vote"><vote/></sui-table-cell>
                              <sui-table-cell v-if="trophy.obtenu"><i class="check icon"></i></sui-table-cell>
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
