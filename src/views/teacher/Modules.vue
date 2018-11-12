<template>
    <div>
        <h2 is="sui-header">Modules</h2>
        <ModalCreateModule v-if="open"/>
    </div>
</template>

<script>
import Vue from 'vue'
import CreateModule from '@/components/CreateModule'
Vue.component('ModalCreateModule', CreateModule)

export default {
  data () {
    return {
      open: true
    }
  }
}
</script>

<style>

</style>
