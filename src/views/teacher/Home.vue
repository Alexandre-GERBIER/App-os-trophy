<template>
  <div id="fond">
    <sui-menu class="fixed inverted dblue" id="menu_student_big">
      <sui-menu-item is="sui-header">App'Os Trophy - enseignant</sui-menu-item>

      <router-link is="sui-menu-item" v-for="item in sections" :key="item[0]" :to="item[1]">
        {{ item[0] }}
      </router-link>

      <sui-dropdown item icon="content" position="right" class=" top right">
        <sui-dropdown-menu>
          <router-link is="sui-dropdown-item" to="/teacher/profile">
              <sui-icon name="user"/>
              <span>Mon Compte</span>
          </router-link>
          <router-link is="sui-dropdown-item" to="/login">
            <sui-icon name="sign-out" class="red"/>
            <span>Déconnexion</span>
          </router-link>
        </sui-dropdown-menu>
      </sui-dropdown>
    </sui-menu>

    <sui-menu class="fixed inverted dblue" id="menu_student_small">
      <sui-menu-item is="sui-header">App'Os Trophy</sui-menu-item>
      <sui-dropdown item icon="content" class=" top right">
        <sui-dropdown-menu>

          <router-link is="sui-dropdown-item" to="/student/profile">
            <sui-icon name="user"/>
            <span>Mon Compte</span>
          </router-link>
          <router-link is="sui-menu-item" v-for="item in sections" :key="item[0]" :to="item[1]"><sui-icon :name="item[2]"/>
            <span>{{ item[0] }}</span>
          </router-link>
          <router-link is="sui-dropdown-item" to="/login">
            <sui-icon name="sign-out" class="red"/>
            <span>Déconnexion</span>
          </router-link>

        </sui-dropdown-menu>
      </sui-dropdown>
    </sui-menu>

    <sui-divider hidden/>
    <sui-divider hidden/>
    <sui-divider hidden/>
    <sui-divider hidden />
    <div class="background"></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data () {
    return {
      sections: [
        ['Mes modules', '/teacher/module', 'archive'],
        ['Classement', '/teacher/ranking', 'numbered list']
      ]
    }
  }
}
</script>

<style>
  @media (max-width: 700px) {
    #menu_student_big {
      display: none;
    }
  }

  @media (min-width: 701px) {
    #menu_student_small {
      display: none;
    }
  }

  .background {
    position: fixed;
    background-color: #f1f2f6;
    height: 120%;
    width: 100%;
    z-index: -1;
    top: -20%;
  }

</style>
