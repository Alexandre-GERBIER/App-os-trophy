<template>
    <div id="main">
        <div id="parent">
        <h2 id="center"> App'Os Trophy </h2>
        <sui-grid class=centered>
            <sui-grid-row>
                <sui-grid-column :width="6">
                    <p>Le site App'OS trophy est un outil mis à la disposition des enseignants pour ludifier l'apprentissage de leur matière.
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
#main {
    background-image: url("/static/images/Welcome-back.jpg");
    background-size: cover;
    background-position: center;
    height: 100%;
    position: absolute;
}
#parent {
    display:flex;
    flex-direction:column;
    align-items:center;
    position:relative;
    top: 30%;
}
</style>
