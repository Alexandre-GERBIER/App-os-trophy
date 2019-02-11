<template>
    <div>
        <div id="infoProfil">
            <h2 is="sui-header" >
                <sui-image circular bordered src="/static/images/imageUser.png" /> Profil :
            </h2>
            <sui-grid class="centered">
                <sui-grid-column :width="8">
                    <sui-divider fitted/>
                </sui-grid-column>
            </sui-grid>
            <sui-grid stackable class="centered">
                <sui-grid-row class="texteProfil">
                    <sui-grid-column class="texteGras" :width="2">
                            Nom
                    </sui-grid-column>
                    <sui-grid-column :width="2">
                            {{profileInfo[0].nom}}
                    </sui-grid-column>
                    <sui-grid-column class="texteGras" :width="2">
                            Prénom
                    </sui-grid-column>
                    <sui-grid-column :width="2">
                            {{profileInfo[0].prenom}}
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <sui-grid class="centered">
                <sui-grid-column :width="4">
                    <sui-divider hidden fitted/>
                </sui-grid-column>
                <sui-grid-column :width="4">
                    <sui-divider hidden fitted/>
                </sui-grid-column>
            </sui-grid>
            <sui-grid stackable class="centered">
                <sui-grid-row class="texteProfil">
                    <sui-grid-column class="texteGras" :width="2">
                            Institution
                    </sui-grid-column>
                    <sui-grid-column :width="2">
                            {{ profileInfo[0].institution}}
                    </sui-grid-column>
                    <sui-grid-column class="texteGras" :width="2">
                            Statut
                    </sui-grid-column>
                    <sui-grid-column :width="2">
                            Professeur
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>

            <sui-divider hidden />
            <sui-divider hidden />

            <ChangePassword/>
            <p>{{profileInfo.nuprof}}</p>
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
