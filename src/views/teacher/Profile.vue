<template>
    <div>
        <div id="infoProfil">

            <sui-divider hidden />
            <sui-divider hidden/>

            <h2 is="sui-header" >
                <sui-image circular bordered src="/static/images/imageUser.png" /> Profil :
            </h2>

            <sui-grid class="centered">
                <sui-grid-column :width="6">
                    <sui-divider fitted/>
                </sui-grid-column>
            </sui-grid>

            <label v-for="item in textProfil" :key="item[0]">
                 <sui-grid class="centered">
                    <sui-grid-row id="texteProfil">
                        <sui-grid-column id="texteGras" :width="1">
                                {{ item[0]}}
                        </sui-grid-column>
                        <sui-grid-column :width="2">
                                {{ item[1]}}
                        </sui-grid-column>
                        <sui-grid-column id="texteGras" :width="1">
                                {{ item[2]}}
                        </sui-grid-column>
                        <sui-grid-column :width="2">
                                {{ item[3]}}
                        </sui-grid-column>
                    </sui-grid-row>
                </sui-grid>
            </label>

            <sui-divider hidden />
            <sui-divider hidden />

            <ChangePassword/>
        </div>
    </div>
</template>

<script>

import ChangePassword from '@/components/ChangePassword'

export default {

  components: {ChangePassword},

  data () {
    return {
      percent: 50,
      open: false,
      textProfil: [
        ['Identifiant', '(API) id', 'Groupe', '(API) groupe'],
        ['Nom', '(API) nom', 'Institution', '(API) intitution'],
        ['Prénom', '(API) prenom', 'Statut', '(API) statut']
      ]
    }
  }
}
</script>

<style>

#texteProfil {
    font-size: 1.2em;
    font-family: 'Lato'
}

#texteGras {
    font-weight: bold
}

h2 {
    text-align: center;
}

</style>
