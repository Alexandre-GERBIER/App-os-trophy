<template>
    <div>
        <div id="infoProfil">
            <h2 is="sui-header" >
                <sui-image circular bordered src="/static/images/imageUser.png" /> Profil :
            </h2>
            <sui-divider hidden/>
            <sui-grid class="centered">
                <sui-container>
                    <sui-table color="red" unstackable celled definition>
                        <sui-table-body>
                            <sui-table-row text-align="center">
                                <sui-table-cell>Nom</sui-table-cell>
                                <sui-table-cell>{{profileInfo[0].nom}}</sui-table-cell>
                            </sui-table-row>
                            <sui-table-row text-align="center">
                                <sui-table-cell>Prénom</sui-table-cell>
                                <sui-table-cell>{{profileInfo[0].prenom}}</sui-table-cell>
                            </sui-table-row>
                            <sui-table-row text-align="center">
                                <sui-table-cell>Institution</sui-table-cell>
                                <sui-table-cell>{{profileInfo[0].institution}}</sui-table-cell>
                            </sui-table-row>
                            <sui-table-row text-align="center">
                                <sui-table-cell>Statut</sui-table-cell>
                                <sui-table-cell>Professeur</sui-table-cell>
                            </sui-table-row>
                        </sui-table-body>
                    </sui-table>
                </sui-container>
            </sui-grid>

            <sui-divider hidden />
            <sui-divider hidden />

            <ChangePassword/>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import global from '@/globals.json'
import ChangePassword from '@/components/ChangePassword'

export default {

  components: {ChangePassword},

  data () {
    return {
      open: false,
      profileInfo: {}
    }
  },
  mounted () {
    axios.get(global.API + '/prof/' + this.$session.get('user_account'))
      .then(response => {
        this.profileInfo = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }

}
</script>

<style>

.texteProfil {
    font-size: 1.2em;
    font-family: 'Lato'
}

.texteGras {
    font-weight: bold
}

h2 {
    text-align: center;
}

</style>
