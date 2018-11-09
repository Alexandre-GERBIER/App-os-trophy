<template>
    <div>
        <h1 is="sui-header">{{name}}</h1>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'Home',

  data () {
    return {
      name: 'App\'Os Trophy - teacher home'
    }
  }
}
</script>

<style>

</style>
