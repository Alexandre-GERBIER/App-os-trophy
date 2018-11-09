<template>
    <div>
        <div id="infoProfil">

            <h2 is="sui-header" >
                <sui-image circular bordered src="/static/images/imageUser.png" /> Profil :
            </h2>

            <sui-grid class="centered">
                <sui-grid-row>
                    <sui-grid-column :width="6">
                    <sui-divider fitted/>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>

            <sui-grid class="centered">
                <sui-grid-row>
                    <sui-grid-column :width="1">
                        <sui-form>

                            <sui-form-field>
                                <label id="fontProfilInfo">Identifiant : </label>
                            </sui-form-field>

                            <sui-form-field>
                                <label id="fontProfilInfo">Nom : </label>
                            </sui-form-field>

                            <sui-form-field>
                                <label id="fontProfilInfo">Prénom : </label>
                            </sui-form-field>

                        </sui-form>
                    </sui-grid-column>

                    <sui-grid-column :width="2">
                        <sui-form>

                            <sui-form-field>
                                <label id="fontProfilInfo">(API) id</label>
                            </sui-form-field>

                            <sui-form-field>
                                <label id="fontProfilInfo">(API) nom</label>
                            </sui-form-field>

                            <sui-form-field>
                                <label id="fontProfilInfo">(API) prenom</label>
                            </sui-form-field>

                        </sui-form>
                    </sui-grid-column>

                    <sui-grid-column :width="1">
                        <sui-form>

                            <sui-form-field>
                                <label id="fontProfilInfo">Groupe : </label>
                            </sui-form-field>

                            <sui-form-field>
                            <label id="fontProfilInfo">Institution : </label>
                            </sui-form-field>

                            <sui-form-field>
                            <label id="fontProfilInfo">Statut : </label>
                            </sui-form-field>

                        </sui-form>
                    </sui-grid-column>

                    <sui-grid-column :width="2">
                        <sui-form>

                            <sui-form-field>
                                <label id="fontProfilInfo">(API) groupe</label>
                            </sui-form-field>

                            <sui-form-field>
                            <label id="fontProfilInfo">(API) institution</label>
                            </sui-form-field>

                            <sui-form-field>
                            <label id="fontProfilInfo">(API) statut</label>
                            </sui-form-field>

                        </sui-form>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>

            <sui-divider hidden />
            <sui-divider hidden />

            <ChangePassword/>
        </div>

        <sui-divider hidden />
        <sui-divider hidden />

        <div>
            <div id="infoProfil">
            <h1 is="sui-header" icon text-align="center">
                <sui-header-content>Statistiques :</sui-header-content>
            </h1>
            </div>

            <sui-grid class="centered">
            <sui-grid-row>
                <sui-grid-column :width="6">
                <sui-divider/>
                </sui-grid-column>
            </sui-grid-row>
            </sui-grid>

            <sui-grid class="centered">
                <sui-grid-row>
                <sui-grid-column>
                <sui-form>

                    <sui-form-field>
                        <label id="fontProfilInfo">Niveau</label>
                    </sui-form-field>
                </sui-form>
                </sui-grid-column>

                <sui-grid-column :width="4">
                <sui-progress
                    state="active"
                    indicating
                    :percent="percent"
                    :label="label"
                />
                </sui-grid-column>
            </sui-grid-row>
            </sui-grid>
        </div>

        <sui-divider hidden />
        <sui-divider hidden />

        <div>
            <div id="infoProfil">
                <h2 is="sui-header" icon text-align="center">
                    <sui-header-content>Nombre de trophée :</sui-header-content>
                </h2  >
            </div>
            <sui-grid class="centered">
                <sui-grid-row>
                    <sui-grid-column :width="2">

                        <sui-image src="/static/images/imageTropheeBronze.png" size="small" />

                        <sui-form>
                            <sui-form-field>
                                <label id="fontNbTrophee">(API) Nb trophee bronze </label>
                            </sui-form-field>
                        </sui-form>

                    </sui-grid-column>

                    <sui-grid-column :width="2">
                        <sui-form>

                            <sui-image src="/static/images/imageTropheeArgent.png" size="small" />

                            <sui-form-field>
                                <label id="fontNbTrophee">(API) Nb trophee argent</label>
                            </sui-form-field>

                        </sui-form>
                    </sui-grid-column>

                    <sui-grid-column :width="2">
                        <sui-form>

                            <sui-image src="/static/images/imageTropheeOr.png" size="small" />

                            <sui-form-field>
                                <label id="fontNbTrophee">(API) Nb trophee or</label>
                            </sui-form-field>

                        </sui-form>
                    </sui-grid-column>

                    <sui-grid-column :width="2">
                        <sui-form>

                            <sui-image src="/static/images/imageTropheePlatine.png" size="small" />

                            <sui-form-field>
                                <label id="fontNbTrophee">(API) Nb trophee platine</label>
                            </sui-form-field>

                        </sui-form>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </div>      
    </div>
</template>

<script>

import ChangePassword from '@/components/ChangePassword'

export default {

    components: {ChangePassword},

    data() {
      return {
        percent: 0,
        open : false
      };
    },
    computed: {
      label() {
        return `${this.percent}% Funded`;
      },
    },
    methods: {
      toggle() {
          this.open = !this.open;
      },
      decrease() {
        this.percent -= 1;
        if (this.percent <= 0) {
          this.percent = 0;
        }
      },
      increase() {
        this.percent += 1;
        if (this.percent >= 100) {
          this.percent = 100;
        }
      },
    },
}
</script>

<style>

h2 {
    text-align: center;
}

#vueProfil {
  text-align: center;
}

#fontProfilInfo {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#fontNbTrophee {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
