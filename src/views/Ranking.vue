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
                        <sui-tab-pane v-for="item in mesModules" :key="item.reference" :title="item.nom">
                            <sui-table unstackable celled>
                                <sui-table-header>
                                    <sui-table-row>
                                        <sui-table-header-cell>Rang</sui-table-header-cell>
                                        <sui-table-header-cell>Etudiant</sui-table-header-cell>
                                        <sui-table-header-cell>Niveau</sui-table-header-cell>
                                    </sui-table-row>
                                </sui-table-header>
                                <sui-table-body>
                                    <sui-table-row v-for="item in allStudentModule" :key="item[0]">
                                            <sui-table-cell>{{item.rank}}</sui-table-cell>
                                            <sui-table-cell>{{item.prenom + ' ' + item.nom}}</sui-table-cell>
                                            <sui-table-cell>{{item.level}}</sui-table-cell>
                                    </sui-table-row>
                                </sui-table-body>
                            </sui-table>
                        </sui-tab-pane>
                    </sui-tab>
                </sui-tab-pane>
            </sui-tab>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import global from '@/globals.json'

// TODO : popup qui affiche les infos d'un étudiant en cliquant dessus

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
    let loadingStudents = []
    let studentCount = 0
    /* let loadingStudentsModule = []
    let studentCountModule = 0 */
    axios.get(global.API + '/student')
      .then(response => {
        loadingStudents = response.data
        let nbstudents = loadingStudents.length
        loadingStudents.forEach(student => {
          axios.get(global.API + '/trophy/student/' + student.nuetu)
            .then(response => {
              student.trophies = response.data
              student.level = this.calculLevel(student)
              studentCount++
              if (studentCount === nbstudents) {
                this.allStudent = loadingStudents
                this.allStudent.sort((a, b) => {
                  return b.level - a.level
                })
                for (let i = 0; i < nbstudents; i++) {
                  this.allStudent[i].rank = i + 1
                }
              }
            })
            .catch(e => {
              this.errors.push(e)
            })
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    /* axios.get(global.API + '/module/student/E175119X') // les modules de l'étudiant
      .then(response => {
        this.mesModules = response.data
        this.mesModules.forEach(mod => {
          axios.get(global.API + '/student/module/' + mod.reference) // les étudiants d'un module
            .then(response => {
              loadingStudentsModule = response.data
              let nbstudentsModule = loadingStudentsModule.length
              loadingStudentsModule.forEach(student => {
                axios.get(global.API + '/trophy/student/' + student.nuetu) // les trophées de l'étudiant
                  .then(response => {
                    student.trophies = response.data.filter(trophy => trophy.numod === mod.reference)
                    student.level = this.calculLevel(student)
                    studentCountModule++
                    if (studentCountModule === nbstudentsModule) {
                      this.allStudentModule = loadingStudentsModule
                      this.allStudentModule.sort((a, b) => {
                        return b.level - a.level
                      })
                      for (let i = 0; i < nbstudentsModule; i++) {
                        this.allStudentModule[i].rank = i + 1
                      }
                    }
                  })
                  .catch(e => {
                    this.errors.push(e)
                  })
              })
            })
            .catch(e => {
              this.errors.push(e)
            })
        })
      })
      .catch(e => {
        this.errors.push(e)
      }) */
  },

  methods: {
    calculLevel (student) {
      let currentxp = 0
      let currentlvl = 0
      for (let index = 0; index < student.trophies.length; index++) {
        switch (student.trophies[index].type) {
          case 'platine':
            currentxp += 40
            break
          case 'or':
            currentxp += 30
            break
          case 'argent':
            currentxp += 20
            break
          case 'bronze':
            currentxp += 10
            break
        }
      }
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
