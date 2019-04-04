<template>
<div id="background" >
    <h1 class="">App'Os Trophy</h1>
    <div class="logos">
        <img src="/static/images/univ.jpg" alt="univLogo">
        <img src="/static/images/iutnantes.png" alt="iutLogo">
    </div>
    <div id="login">
        <h2 is="sui-header" class="inverted">Connexion</h2>
        <div class="ui user left icon input">
            <input @keyup.enter="loginUser" ref="ide" placeholder="Identifiant" type="text" name="ide" v-model="ide">
            <i class="user icon"></i>
        </div>
        <div class="ui lock left icon input">
            <input @keyup.enter="loginUser" placeholder="Mot de passe" type="password" v-model="pass">
            <i class="lock icon"></i>
        </div>
        <div @click="loginUser" :class="'ui icon sign in right labeled button green ' + (loading ? 'loading' : '')">
            <i class="sign in icon"></i>Login
        </div>
    </div>
</div>
</template>

<script>

import axios from 'axios'
import global from '@/globals.json'

export default {

  data () {
    return {
      loading: false,
      ide: 'msauciflard@gmail.com',
      pass: '',
      errors: []
    }
  },

  mounted () {
    this.$refs.ide.focus()

    sessionStorage.clear()
    localStorage.clear()
  },

  methods: {
    rlink (accountType) {
      return (accountType === 'student') ? '/student/profile' : '/teacher/profile'
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
          localStorage.setItem('modules', JSON.stringify(modules))
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    getModulesTeacher () {
      let modules = []

      axios.get(global.API + '/prof/module/' + this.$session.get('user_account'))
        .then(response => {
          modules = response.data
          for (let module of modules) {
            module.visible = true // TODO changer ça
            module.trophies = 0
            module.trophies_loaded = false
            module.visible_loaded = true
          }
          localStorage.setItem('modules', JSON.stringify(modules))
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    loginUser () {
      this.loading = true

      // start session
      this.$session.start()

      let accountValid = false

      axios.post(global.API + '/login', {
        email: this.ide,
        password: this.pass
      }).then(res => {
        let data = res.data
        accountValid = (res.data.token !== undefined)
        if (accountValid) {
          let accountType = (data.type === 'prof') ? 'prof' : 'student'
          this.$session.set('user_type', accountType)
          this.$session.set('user_account', data.identifiant)
          this.$session.set('api_token', data.token)

          // récupération de la liste des modules
          if (accountType === 'student') {
            this.getModulesStudent()
          } else {
            this.getModulesTeacher()
          }

          this.$router.replace(this.rlink(accountType))
        } else {
          alert('Une erreur est survenue')
        }
      }).catch(e => {
        this.errors.push(e)
        this.loading = false
        alert('Le login ou mot de passe est incorrect')
      })
      /*
      axios.get(global.API + '/' + this.accountType() + '/' + this.ide)
        .then(res => {
          console.log('done')
          accountValid = (res.data.length === 1)
          if (accountValid) {
            console.log('valid')
            this.$session.set('user_type', this.accountType())
            this.$session.set('user_account', this.ide)

            // récupération de la liste des modules
            if (this.accountType() === 'student') {
              this.getModulesStudent()
            } else {
              this.getModulesTeacher()
            }

            this.$router.replace(this.rlink())
          } else {
            console.log('invalid login !')
          }
        })
        .catch(e => {
          this.errors.push(e)
        })  */
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

    h1 {
      color: #002e5d;
      border-bottom: 4px solid #c4d600;
      border-bottom-right-radius: 20%;
      font-size: 5em;
    }

    #background{
        background-image:url("/static/images/ecranConnexion1.jpg");
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
    @media (max-width: 700px) {
        #background{
            background-image:url("/static/images/ecranConnexion2.jpg");
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
    /*#background h1{
        font-size: 500%;
        margin-bottom:8%;
        text-align:center;
        border: solid 2px rgb(66, 66, 66);
        border-radius: 20px;
        padding: 30px;
        margin: 0 5px;
        background-color: rgba(66, 66, 66, 0.2);
    }*/
    @media (max-width: 700px) {
        h1 {
          font-size: 3em;
        }
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
