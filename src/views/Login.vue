<template>
<div id="background">
    <h1 is="sui-header" class="">App'Os Trophy</h1>
    <form id="login">
        <h2 is="sui-header" class="inverted">Connexion</h2>
        <div class="ui user left icon input">
            <input placeholder="Identifiant" type="text" name="ide" v-model="ide">
            <i class="user icon"></i>
        </div>
        <div class="ui lock left icon input">
            <input placeholder="Mot de passe" type="password">
            <i class="lock icon"></i>
        </div>
        <router-link :to="rlink">
            <button class="ui icon sign in right labeled button green" v-on:click="routage"><i class="sign in icon"></i>Login</button>
        </router-link>
    </form>
</div>
</template>

<script>
export default {

  data () {
    return {
      ide: ''
    }
  },

  computed: {
    rlink () {
      return (this.ide === '') ? '/student/profile' : '/teacher/profile'
    }
  },

  methods: {
    routage () {
      if (this.ide === '') {
        this.rlink = '/student/profile'
      } else {
        this.rlink = '/teacher/profile'
      }
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
</style>
