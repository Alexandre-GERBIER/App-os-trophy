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

            <label v-for="item in profileInfo" :key="item[0]">
                 <sui-grid stackable class="centered">
                    <sui-grid-row id="texteProfil">
                        <sui-grid-column id="texteGras" :width="2">
                                {{ item[0]}}
                        </sui-grid-column>
                        <sui-grid-column :width="2">
                                {{ item[1]}}
                        </sui-grid-column>
                        <sui-grid-column id="texteGras" :width="2">
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
            <p>{{profileInfo.nuprof}}</p>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
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
    axios.get(global.API + '/prof/j.roger')
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
