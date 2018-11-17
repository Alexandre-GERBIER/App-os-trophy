<template>
    <div>
      <sui-container>
        <h2 is="sui-header">Mes modules</h2>
        <sui-table unstackable>
          <sui-table-header>
            <sui-table-row>
              <sui-table-header-cell>Module</sui-table-header-cell>
              <sui-table-header-cell>Trophées</sui-table-header-cell>
              <sui-table-header-cell>Visible</sui-table-header-cell>
              <sui-table-header-cell text-align="right">Editer</sui-table-header-cell>
            </sui-table-row>
          </sui-table-header>
          <sui-table-body>
            <sui-table-row v-for="module in modules" :key="module.name">
              <sui-table-cell>{{module.id}} - {{module.name}}</sui-table-cell>
              <sui-table-cell>{{module.trophies}}</sui-table-cell>
              <sui-table-cell><i v-if="!module.hidden" class="check icon"></i></sui-table-cell>
              <sui-table-cell text-align="right"><router-link :to="'/teacher/module/' + module.id">éditer le module</router-link></sui-table-cell>
            </sui-table-row>
          </sui-table-body>
        </sui-table>

        <ModalCreateModule/>
      </sui-container>
    </div>
</template>

<script>
import Vue from 'vue'
import CreateModule from '@/components/CreateModule'
Vue.component('ModalCreateModule', CreateModule)

export default {
  data () {
    return {
      modules: [
        {
          id: 'M3101',
          name: 'Bases de données avancées',
          trophies: '3',
          hidden: true
        },
        {
          id: 'M3202',
          name: 'GPI',
          trophies: '10',
          hidden: false
        }
      ]
    }
  }
}
</script>

<style>

</style>
