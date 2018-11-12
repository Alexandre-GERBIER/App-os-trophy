<template>
<div id="background">
    <form id="login">
        <h1 is="sui-header" class="inverted">App'Os Trophy</h1>
        <h2 is="sui-header" class="inverted">Connexion</h2>
        <div class="ui user left icon input">
            <input placeholder="Identifiant" type="text">
            <i class="user icon"></i>
        </div>
        <div class="ui lock left icon input">
            <input placeholder="Mot de passe" type="password">
            <i class="lock icon"></i>
        </div>
        <router-link to="/student/profile">
            <button class="ui icon sign in right labeled button green"><i class="sign in icon"></i>Login</button>
        </router-link>
    </form>
</div>
</template>

<script>
export default {

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
        justify-content:center;
        align-items:center;
    }
    #login{
        display:flex;
        flex-direction:column;
        align-items:center;
        position:relative;
        top:12%;
        width:33%;
    }
    #login h2, #login div{
        margin: 2%;
    }
    #login h2{
        font-size: 2.5em;
    }
    #login h1{
        font-size: 2.8em;
        margin-bottom:8%;
        width:100%;
        text-align:center;
    }
    #login div{
        width:100%;
    }
</style>
