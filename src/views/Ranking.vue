<template>
    <div>
        <h1 is="sui-header">Classement</h1>
        <div id="classementP">
            <sui-tab @change="testRender()">
                <sui-tab-pane title="Global">
                    <sui-table color="purple" unstackable celled>
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
                    <sui-tab :menu="{secondary: true}">
                        <sui-tab-pane v-for="mod in mesModules" :key="mod.reference" :title="mod.nom">
                            <sui-table color="pink" unstackable celled>
                                <sui-table-header>
                                    <sui-table-row>
                                        <sui-table-header-cell>Rang</sui-table-header-cell>
                                        <sui-table-header-cell>Etudiant</sui-table-header-cell>
                                        <sui-table-header-cell>Niveau</sui-table-header-cell>
                                    </sui-table-row>
                                </sui-table-header>
                                <sui-table-body :key="test">
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
        <div v-if="chargement" class="ui active dimmer">
          <div class="ui indeterminate text loader">Chargement ...</div>
        </div>
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
      open: false,
      chargement: true,
      test: 0
    }
  },

  mounted () {
    let promesse1 = []
    let promesse2 = []
    promesse1.push(axios.get(global.API + '/rank')
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
      }))
    let tmpAllStudentModule = {}
    promesse2.push(axios.get(global.API + '/module/' + this.$session.get('user_type') + '/' + this.$session.get('user_account')) // les modules de l'étudiant --> mesModules
      .then(response => {
        this.mesModules = response.data
        this.mesModules.forEach(mod => { // mod --> pour chaque module
          axios.get(global.API + '/rank/' + mod.reference)
            .then(response => {
              let rankModule = response.data
              let nbstudents = rankModule.length
              rankModule.forEach(student => {
                student.level = this.calculLevel(student)
                rankModule.sort((a, b) => {
                  return b.level - a.level
                })
                for (let i = 0; i < nbstudents; i++) {
                  rankModule[i].rank = i + 1
                }
                tmpAllStudentModule[mod.reference] = rankModule
              })
            })
            .catch(e => {
              this.errors.push(e)
            })
        })
      })
      .catch(e => {
        this.errors.push(e)
      }))
    Promise.all(promesse1, promesse2).then(() => {
      this.allStudentModule = tmpAllStudentModule
      this.chargement = false
    })
  },

  methods: {
    calculLevel (student) {
      let currentxp = student.nbPlatine * 40 + student.nbOr * 30 + student.nbArgent * 20 + student.nbBronze * 10
      let currentlvl = 0
      currentlvl = currentxp / 50
      return currentlvl
    },
    testRender () {
      this.test += 1
      console.log()
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
