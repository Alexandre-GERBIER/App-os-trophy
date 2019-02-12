<template>
    <div id="main">
        <div id="parent">
          <br>
        <h2 id="center"> App'Os Trophy </h2>
        <sui-grid class=centered>
            <sui-grid-row>
                <sui-grid-column :width="6" id="welcome_big">
                    <p>
                        Le site App'OS trophy est un outil mis à la disposition des enseignants pour ludifier l'apprentissage de leur matière.
                        Le site permet de distribuer des trophées aux élèves pour stimuler leur compétitivité et favoriser l'émulation intellectuelle.
                        Les élèves peuvent voter entre eux pour l'attribution de trophées.
                    </p>
                </sui-grid-column>
              <sui-grid-column :width="10" id="welcome_small">
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

}
</script>

<style scoped>
p {
    text-align: justify;
}
#center {
    text-align: center;
}

@media (max-width: 700px) {
  #welcome_big {
    display: none;
  }
}

@media (min-width: 701px) {
  #welcome_small {
    display: none;
  }
}
#main {
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  background: white url("/static/images/Welcome-back.jpg") center center no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;

}
#parent {
    display:flex;
    flex-direction:column;
    align-items:center;
    position:relative;
    top: 30%;
}
</style>
