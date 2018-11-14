<template>
  <div>
    <h2 is="sui-header">Modules</h2>
    <sui-container>
      <sui-table unstackable>
        <sui-table-header>
          <sui-table-row>
            <sui-table-header-cell>Module</sui-table-header-cell>
            <sui-table-header-cell>Niveau</sui-table-header-cell>
            <sui-table-header-cell>Trophées</sui-table-header-cell>
            <sui-table-header-cell text-align="right">Informations</sui-table-header-cell>
          </sui-table-row>
        </sui-table-header>
        <sui-table-body>
          <sui-table-row v-for="module in modules" :key="module.name">
            <sui-table-cell>{{module.id}} - {{module.name}}</sui-table-cell>
            <sui-table-cell>{{module.level}}</sui-table-cell>
            <sui-table-cell>{{module.trophies}} / {{module.max_trophies}}</sui-table-cell>
            <sui-table-cell text-align="right"><router-link :to="'/student/module/' + module.id">voir les détails du module</router-link></sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
    </sui-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modules: [
        {
          id: 'M3101',
          name: 'Bases de données avancées',
          level: '1',
          trophies: '3',
          max_trophies: '10'
        },
        {
          id: 'M3202',
          name: 'GPI',
          level: '5',
          trophies: '10',
          max_trophies: '15'
        },
        {
          id: 'M3104',
          name: 'Programmation serveur web',
          level: '2',
          trophies: '4',
          max_trophies: '30'
        }
      ]
    }
  }
}
</script>

<style>

</style>
