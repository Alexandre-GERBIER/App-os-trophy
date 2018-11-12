<template>
  <div>
    <sui-menu class="fixed">
      <sui-menu-item is="sui-header">App'Os Trophy - étudiant</sui-menu-item>

      <router-link is="sui-menu-item" v-for="item in sections" :key="item[0]" :to="item[1]">{{ item[0] }}</router-link>

      <sui-dropdown item icon="content" position="right" class=" top right">
        <sui-dropdown-menu>
          <router-link is="sui-dropdown-item" to="/student/profile">
              <sui-icon name="user"/>
              <span>Mon Compte</span>
          </router-link>
          <a is="sui-dropdown-item">
            <sui-icon name="sign-out" class="red"/>
            <span>Déconnexion</span>
          </a>
        </sui-dropdown-menu>
      </sui-dropdown>
    </sui-menu>

    <sui-divider hidden/>
    <sui-divider hidden/>
    <sui-divider hidden/>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data () {
    return {
      sections: [
        ['Mes trophées', '/student/trophy'],
        ['Mes modules', '/student/module'],
        ['Classement', '/student/ranking']
      ]
    }
  }
}
</script>

<style>

</style>
