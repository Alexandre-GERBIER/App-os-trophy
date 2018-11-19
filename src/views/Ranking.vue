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
                            <sui-table-row v-for="item in classementGeneral" :key="item[0]">
                                    <sui-table-cell>{{item[0]}}</sui-table-cell>
                                    <sui-table-cell>{{item[1]}}</sui-table-cell>
                                    <sui-table-cell>{{item[2]}}</sui-table-cell>
                            </sui-table-row>
                        </sui-table-body>
                    </sui-table>
                </sui-tab-pane>
                <sui-tab-pane title="Module">
                    <sui-tab  :menu="{ secondary: true }">
                        <sui-tab-pane title="Math">
                            <sui-table unstackable celled>
                                <sui-table-header>
                                    <sui-table-row>
                                        <sui-table-header-cell>Rang</sui-table-header-cell>
                                        <sui-table-header-cell>Etudiant</sui-table-header-cell>
                                        <sui-table-header-cell>Niveau</sui-table-header-cell>
                                    </sui-table-row>
                                </sui-table-header>
                                <sui-table-body>
                                    <sui-table-row v-for="item in classementModuleMath" :key="item[0]">
                                            <sui-table-cell>{{item[0]}}</sui-table-cell>
                                            <sui-table-cell>{{item[1]}}</sui-table-cell>
                                            <sui-table-cell>{{item[2]}}</sui-table-cell>
                                    </sui-table-row>
                                </sui-table-body>
                            </sui-table>
                        </sui-tab-pane>
                        <sui-tab-pane title="Probas">
                            <sui-table unstackable celled>
                                <sui-table-header>
                                    <sui-table-row>
                                        <sui-table-header-cell>Rang</sui-table-header-cell>
                                        <sui-table-header-cell>Etudiant</sui-table-header-cell>
                                        <sui-table-header-cell>Niveau</sui-table-header-cell>
                                    </sui-table-row>
                                </sui-table-header>
                                <sui-table-body>
                                    <sui-table-row v-for="item in classementModuleProbas" :key="item[0]">
                                            <sui-table-cell>{{item[0]}}</sui-table-cell>
                                            <sui-table-cell>{{item[1]}}</sui-table-cell>
                                            <sui-table-cell>{{item[2]}}</sui-table-cell>
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
// TODO : popup qui affiche les infos d'un étudiant en cliquant dessus
export default {
  data () {
    return {
      open: false,
      classementGeneral: [
        ['1', 'jean', '14'],
        ['2', 'paul', '11'],
        ['3', 'patrick', '8'],
        ['4', 'louis', '7']
      ],
      classementModuleMath: [
        ['1', 'paul', '4'],
        ['2', 'jean', '4'],
        ['3', 'patrick', '3'],
        ['4', 'louis', '2']
      ],
      classementModuleProbas: [
        ['1', 'jean', '10'],
        ['2', 'paul', '7'],
        ['3', 'louis', '5'],
        ['4', 'patrick', '5']
      ]

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
