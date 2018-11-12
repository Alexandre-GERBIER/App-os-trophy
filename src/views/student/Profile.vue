<template>
    <div>
        <div id="infoProfil">

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

        <sui-divider hidden />
        <sui-divider hidden />

        <div>
            <div>
                <h1 is="sui-header" icon text-align="center">
                    <sui-header-content>Statistiques :</sui-header-content>
                </h1>
            </div>

            <sui-grid class="centered">
                <sui-grid-column :width="8">
                    <sui-divider/>
                </sui-grid-column>
            </sui-grid>

            <sui-grid class="centered">
                <sui-grid-row>
                <sui-grid-column>
                    <label>Niveau</label>
                </sui-grid-column>

                <sui-grid-column>
                    <label >(API) niveauactuel</label>
                </sui-grid-column>

                <sui-grid-column :width="4">
                <sui-progress
                    state="active"
                    indicating
                    :percent="percent"
                    :label="label"/>
                </sui-grid-column>

                <sui-grid-column>
                    <label >(API) niveausuivant</label>
                </sui-grid-column>
            </sui-grid-row>
            </sui-grid>
        </div>

        <sui-divider hidden />
        <sui-divider hidden />

        <div>
            <div>
                <h2 is="sui-header" icon text-align="center">
                    <sui-header-content>Nombre de trophées :</sui-header-content>
                </h2  >
            </div>

            <sui-divider hidden/>
            <sui-divider hidden/>

            <sui-grid class="centered">
                <label v-for="item in textTrophee" :key="item[0]">
                    <sui-grid-column>
                        <sui-image id="imageTrophee" :src="item[0]" size="small"/>
                        <br/>
                        <label id="texteProfil">
                            {{ item[1]}}
                        </label>
                    </sui-grid-column>
                </label>
            </sui-grid>
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
      ],
      textStat: [
        ['Niveau'],
        ['(API) niveauactuel'],
        ['state="active" indicating :percent="percent" :label="label"'],
        ['(API) niveausuivant']
      ],
      textTrophee: [
        ['/static/images/imageTropheeBronze.png', '(API) nbtropheebronze'],
        ['/static/images/imageTropheeArgent.png', '(API) nbtropheeargent'],
        ['/static/images/imageTropheeOr.png', '(API) nbtropheeor'],
        ['/static/images/imageTropheePlatine.png', '(API) nbtropheeplatine']
      ]
    }
  },
  computed: {
    label () {
      return ` Progression ${this.percent}%`
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
    },
    decrease () {
      this.percent -= 1
      if (this.percent <= 0) {
        this.percent = 0
      }
    },
    increase () {
      this.percent += 1
      if (this.percent >= 100) {
        this.percent = 100
      }
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

#imageTrophee {
    position: relative;
    left: 25%;
    zoom: 50%
}

</style>
