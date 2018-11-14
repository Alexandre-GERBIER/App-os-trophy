<template>
    <div>
        <h1 is="sui-header">Classement</h1>

        <div id="boutonChoix">
            <sui-container>
            <sui-button-group size="medium">
                <sui-button content="Global" fluid/>
                <sui-buttonfluid>
                    <sui-dropdown text="Module" button pointing fluid>
                        <sui-dropdown-menu>
                            <sui-dropdown-item>Math</sui-dropdown-item>
                            <sui-dropdown-item>WebServ</sui-dropdown-item>
                            <sui-dropdown-item>ProbaStat</sui-dropdown-item>
                        </sui-dropdown-menu>
                    </sui-dropdown>

                </sui-buttonfluid>
            </sui-button-group>
            </sui-container>
        </div>

        <sui-grid stackable class="centered">
            <sui-grid-row>
                <sui-grid-column>
                    Rang
                </sui-grid-column>
                <sui-grid-column>
                    Etudiant
                </sui-grid-column>
                <sui-grid-column>
                    Niveau
                </sui-grid-column>
            </sui-grid-row>
            <label v-for="item in classement" :key="item[0]">
                <sui-grid-row>
                    <sui-grid-column>
                        {{item[0]}}
                    </sui-grid-column>
                    <sui-grid-column>
                        {{item[1]}}
                    </sui-grid-column>
                    <sui-grid-column>
                        {{item[2]}}
                    </sui-grid-column>
                    <sui-grid-column>
                        {{item[3]}}
                    </sui-grid-column>
                </sui-grid-row>
            </label>
        </sui-grid>


    </div>
</template>

<script>
// TODO : popup qui affiche les infos d'un étudiant en cliquant dessus
export default {

    data () {
        return {
            open: false,
            classement: [
                ['1', '2', '3', '4'],
                ['jean', 'paul', 'patrick', 'louis'],
                ['14', '12', '11', '6']
            ]
        }
    }
}
</script>

<style>

h1 {
    text-align: center
}

#boutonChoix {
    position: relative;
    left: 18%;
}

</style>
