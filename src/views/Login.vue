<template>
<div id="background">
    <h1 is="sui-header" class="">App'Os Trophy</h1>
    <div class="logos">
        <img src="/static/images/univ.jpg" alt="univLogo">
        <img src="/static/images/iutnantes.png" alt="iutLogo">
    </div>
    <form id="login">
        <h2 is="sui-header" class="inverted">Connexion</h2>
        <div class="ui user left icon input">
            <input placeholder="Identifiant" type="text" name="ide" v-model="ide">
            <i class="user icon"/>
        </div>
        <div class="ui lock left icon input">
            <input placeholder="Mot de passe" type="password">
            <i class="lock icon"/>
        </div>
        <div @click="loginUser" class="ui icon sign in right labeled button green">
            <i class="sign in icon"/>Login
        </div>
    </form>
</div>
</template>

<script>

import axios from 'axios'
import global from '@/globals.json'

export default {

  data () {
    return {
      ide: 'E175119X',
      errors: []
    }
  },
  methods: {
    rlink () {
      return (this.accountType() === 'student') ? '/student/profile' : '/teacher/profile'
    },

    accountType () {
      if (this.ide.includes('.')) {
        return 'prof'
      } else {
        return 'student'
      }
    },

    getModulesStudent () {
      let modules = []

      axios.get(global.API + '/module/student/' + this.$session.get('user_account'))
        .then(response => {
          modules = response.data
          for (let module of modules) {
            module.max_trophies = ''
            module.level = ''
            module.trophies = []
            module.level_loaded = false
            module.progress_loaded = false
          }
          console.log('GOT MODULES !')
          localStorage.setItem('modules', JSON.stringify(modules))
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    loginUser () {
      // start session
      this.$session.start()

      let accountValid = false

      axios.get(global.API + '/' + this.accountType() + '/' + this.ide)
        .then(res => {
          console.log('done')
          accountValid = (res.data.length === 1)
          if (accountValid) {
            console.log('valid')
            this.$session.set('user_type', this.accountType())
            this.$session.set('user_account', this.ide)

            /* initialisation de la connexion */

            // récupération de la liste des modules
            if (this.accountType() === 'student') {
              this.getModulesStudent()
            }

            this.$router.replace(this.rlink())
          } else {
            console.log('invalid login !')
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    #background{
        background-image:url("/static/images/2.jpg");
        background-size:cover;
        background-position: center;
        position: absolute;
        height:100%;
        width:100%;
        display:flex;
        flex-direction: column;
        justify-content:space-around;
        align-items:center;
    }
    @media (max-width: 1200px) {
        #background{
            background-image:url("/static/images/2.2.jpg");
            background-repeat: no-repeat;
        }
    }
    #login{
        display:flex;
        flex-direction:column;
        align-items:center;
        position: relative;
        bottom: 10%;
    }
    #login h2, #login div{
        margin: 5%;
    }
    #login h2{
        font-size: 2.5em;
    }
    #background h1{
        font-size: 500%;
        margin-bottom:8%;
        text-align:center;
        border: solid 2px rgb(66, 66, 66);
        border-radius: 20px;
        padding: 30px;
        margin: 0 5px;
        background-color: rgba(66, 66, 66, 0.2);
    }
    @media (max-width: 700px) {
        #background h1{
            padding: 10px;
            font-size: 300%;
            margin-bottom:10%;
        }
        #login h2, #login div{
            margin: 2%;
        }
        #login{
            bottom: 18%
        }
    }
    #login div{
        width:100%;
    }
    .logos img{
        width: 10%;
        height: 10%;
        margin: 10px;
    }
    .logos{
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: space-between;
        top: 0;
    }
</style>
