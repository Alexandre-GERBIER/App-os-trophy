<template>
  <div>
    <sui-menu>
      <sui-menu-item is="sui-header">App'Os Trophy - étudiant</sui-menu-item>

      <a is="sui-menu-item" v-for="item in sections" :key="item">{{ item }}</a>

      <sui-dropdown item icon="content" position="right" class=" top right">
        <sui-dropdown-menu>
          <a is="sui-dropdown-item">
              <sui-icon name="user"/>
              <span>Mon Compte</span>
            </a>
          <a is="sui-dropdown-item">
            <sui-icon name="sign-out" class="red"/>
            <span>Déconnexion</span>
          </a>
        </sui-dropdown-menu>
      </sui-dropdown>
    </sui-menu>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data () {
    return {
      sections: [
        'Mes trophées',
        'Mes modules',
        'Classement'
      ]
    }
  }
}
</script>

<style>

</style>
