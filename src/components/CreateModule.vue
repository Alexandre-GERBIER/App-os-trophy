<template>
  <sui-modal v-model="open">
    <sui-modal-header>
      Créer un module
    </sui-modal-header>
    <sui-modal-content>
      formulaire
    </sui-modal-content>
    <sui-modal-actions>
      <sui-button positive>
        Créer
      </sui-button>
    </sui-modal-actions>
  </sui-modal>
</template>

<script>
export default {
  data () {
    return { open: true }
  }
}
</script>

<style>

</style>
