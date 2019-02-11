<template>
    <div>
        <h1 is="sui-header">Classement</h1>
        <div id="classementP">
            <sui-tab>
                <sui-tab-pane title="Global">
                    <sui-table unstackable celled>
                        <sui-table-header>
                            <sui-table-row>
                                <sui-table-header-cell>Rang</sui-table-header-cell>
                                <sui-table-header-cell>Etudiant</sui-table-header-cell>
                                <sui-table-header-cell>Niveau</sui-table-header-cell>
                            </sui-table-row>
                        </sui-table-header>
                        <sui-table-body>
                            <sui-table-row v-for="item in allStudent" :key="item[0]">
                                    <sui-table-cell>{{item.rank}}</sui-table-cell>
                                    <sui-table-cell>{{item.prenom + ' ' + item.nom}}</sui-table-cell>
                                    <sui-table-cell>{{item.level}}</sui-table-cell>
                            </sui-table-row>
                        </sui-table-body>
                    </sui-table>
                </sui-tab-pane>
                <sui-tab-pane title="Module">
                    <sui-tab  :menu="{ secondary: true }">
                        <sui-tab-pane v-for="mod in mesModules" :key="mod.reference" :title="mod.nom">
                            <sui-table unstackable celled>
                                <sui-table-header>
                                    <sui-table-row>
                                        <sui-table-header-cell>Rang</sui-table-header-cell>
                                        <sui-table-header-cell>Etudiant</sui-table-header-cell>
                                        <sui-table-header-cell>Niveau</sui-table-header-cell>
                                    </sui-table-row>
                                </sui-table-header>
                                <sui-table-body>
                                    <sui-table-row v-for="student in allStudentModule[mod.reference]" :key="student.nuetu">
                                            <sui-table-cell>{{student.rank}}</sui-table-cell>
                                            <sui-table-cell>{{student.prenom + ' ' + student.nom}}</sui-table-cell>
                                            <sui-table-cell>{{student.level}}</sui-table-cell>
                                    </sui-table-row>
                                </sui-table-body>
                            </sui-table>
                        </sui-tab-pane>
                    </sui-tab>
                </sui-tab-pane>
            </sui-tab>
        </div>
        {{allStudentModule}}
    </div>
</template>

<script>
import axios from 'axios'
import global from '@/globals.json'

export default {
  data () {
    return {
      allStudent: {},
      allStudentModule: {},
      mesModules: {},
      open: false
    }
  },

  mounted () {
    axios.get(global.API + '/rank')
      .then(response => {
        this.allStudent = response.data
        let nbstudents = this.allStudent.length
        this.allStudent.forEach(student => {
          student.level = this.calculLevel(student)
          this.allStudent.sort((a, b) => {
            return b.level - a.level
          })
          for (let i = 0; i < nbstudents; i++) {
            this.allStudent[i].rank = i + 1
          }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    axios.get(global.API + '/module/student/E175119X') // les modules de l'étudiant --> mesModules
      .then(response => {
        this.mesModules = response.data
        this.mesModules.forEach(mod => { // mod --> pour chaque module
          axios.get(global.API + '/rank/' + mod.reference)
            .then(response => {
              let tmp = response.data
              let nbstudents = tmp.length
              tmp.forEach(student => {
                student.level = this.calculLevel(student)
                tmp.sort((a, b) => {
                  return b.level - a.level
                })
                for (let i = 0; i < nbstudents; i++) {
                  tmp[i].rank = i + 1
                }
                this.allStudentModule[mod.reference] = tmp
              })
            })
            .catch(e => {
              this.errors.push(e)
            })
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
  },

  methods: {
    calculLevel (student) {
      let currentxp = student.nbPlatine * 40 + student.nbOr * 30 + student.nbArgent * 20 + student.nbBronze * 10
      let currentlvl = 0
      currentlvl = currentxp / 50
      return currentlvl
    }
  }
}
</script>

<style>

h1 {
    text-align: center
}

#classementP {
    text-align: center
}

</style>
