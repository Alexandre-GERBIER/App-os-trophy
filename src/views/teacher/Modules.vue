<template>
    <div>
        <h2 is="sui-header">Modules</h2>
        <ModalCreateModule></ModalCreateModule>
    </div>
</template>

<script>
import Vue from 'vue'
import CreateModule from '@/components/CreateModule'
Vue.component('ModalCreateModule', CreateModule)

export default {

}
</script>

<style>

</style>
