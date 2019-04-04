<template>
    <div id="main">
        <div class="background"></div>
        <div id="parent">
          <br>
          <h2 id="center"> App'Os Trophy </h2>
          <sui-grid class=centered>
              <sui-grid-row>
                  <sui-grid-column :width="8" id="welcome_big">
                      <p>
                          Le site App'OS trophy est un outil mis à la disposition des enseignants pour ludifier l'apprentissage de leur matière.
                          Le site permet de distribuer des trophées aux élèves pour stimuler leur compétitivité et favoriser l'émulation intellectuelle.
                          Les élèves peuvent voter entre eux pour l'attribution de trophées.
                      </p>
                  </sui-grid-column>
                <sui-grid-column :width="12" id="welcome_small">
                  <p>
                    Le site App'OS trophy est un outil mis à la disposition des enseignants pour ludifier l'apprentissage de leur matière.
                    Le site permet de distribuer des trophées aux élèves pour stimuler leur compétitivité et favoriser l'émulation intellectuelle.
                    Les élèves peuvent voter entre eux pour l'attribution de trophées.
                  </p>
                </sui-grid-column>
              </sui-grid-row>
          </sui-grid>
          <sui-divider hidden></sui-divider>
          <div id="center">
              <router-link to="login">
                  <sui-button positive>Identification</sui-button>
              </router-link>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  mounted () {
    // connecter l'utilisateur automatiquement si celui-ci s'est déjà connecté durant la session
    if (this.$session.get('api_token') !== undefined && this.$session.get('user_type') !== undefined) {
      this.$router.replace(this.rlink(this.$session.get('user_type')))
    }
  },

  methods: {
    rlink (accountType) {
      return (accountType === 'student') ? '/student/profile' : '/teacher/profile'
    }
  }
}
</script>

<style scoped>
p {
    text-align: justify;
}
#center {
    text-align: center;
}

@keyframes slideDown {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

#parent {
  animation: 1.5s ease-out slideDown;
}

@media (max-width: 700px) {
  #welcome_big {
    display: none;
  }

  #parent {
    position: relative;
    margin: auto;
    background-color: #ffffff;
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 5px;
    display:flex;
    flex-direction:column;
    align-items:center;
    position:relative;
    top: 10%;
    width: 80%;
    padding-bottom: 52px;
  }
}

@media (min-width: 701px) {
  #welcome_small {
    display: none;
  }

  #parent {
    position: relative;
    margin: auto;
    background-color: #ffffff;
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 5px;
    display:flex;
    flex-direction:column;
    align-items:center;
    position:relative;
    top: 20%;
    width: 50%;
    padding-bottom: 52px;
  }
}

#main {
  position: absolute;
  height: 100%;
}

.background {
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  background: white url("/static/images/tableauNoir.jpg") center center no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  position: fixed;
  height: 100%;
  width: 100%;
}

h2 {
  color: #002e5d;
  border-bottom: 4px solid #c4d600;
  border-bottom-right-radius: 20%;
  font-size: 2em;
}
</style>
