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
                                    <sui-table-row v-for="student in mod.classement" :key="student[0]">
                                            <sui-table-cell>{{mod}}</sui-table-cell>
                                            <sui-table-cell>{{student.rank}}</sui-table-cell>
                                            <sui-table-cell>{{student.prenom + ' ' + item.nom}}</sui-table-cell>
                                            <sui-table-cell>{{student.level}}</sui-table-cell>
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
    let loadingStudentsModule = []
    let studentCountModule = 0
    let moduleCount = 0
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
        let nbModules = this.mesModules.length
        this.mesModules.forEach(mod => { // mod --> pour chaque module
          axios.get(global.API + '/student/module/' + mod.reference) // les étudiants d'un module --> loadingStudentsModule
            .then(response => {
              loadingStudentsModule = response.data
              let nbstudentsModule = loadingStudentsModule.length // nbstudentsModule --> nombre d'étudiant pour un module
              loadingStudentsModule.forEach(student => { // student --> pour chaque étudiant
                axios.get(global.API + '/trophy/student/' + student.nuetu) // les trophées de l'étudiant
                  .then(response => {
                    student.trophies = response.data.filter(trophy => trophy.numod === mod.reference) // student.trophies --> les trophées pour le modules en question
                    student.level = this.calculLevel(student) // student.level --> le level pour le module en question
                    studentCountModule++
                    if (studentCountModule === nbstudentsModule) { // On test si on a fait pour tous les étu du module
                      this.loadingStudentsModule.sort((a, b) => { // On ordonne les étudiants
                        return b.level - a.level
                      })
                      for (let i = 0; i < nbstudentsModule; i++) { // On donne le rang
                        loadingStudentsModule[i].rank = i + 1
                      }
                      console.log('uuuuuu')
                      if (moduleCount !== nbModules) {
                        console.log('dgdfgdh')
                        mod.classement = loadingStudentsModule
                        moduleCount++
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
      })
  },

  methods: {
    calculLevel (student) {
      let currentxp = student.nbPlatine * 40 + student.nbOr * 30 + student.nbArgent * 20 + student.nbBronze * 10
      let currentlvl = 0
      /* for (let index = 0; index < student.trophies.length; index++) {
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
      } */
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
