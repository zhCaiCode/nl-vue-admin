<template>
  <div class="appContainer">
    <AppHeader/>
    <layout/>
  </div>
</template>

<script>
  import layout from '@/layout/index'
  import AppHeader from '@/components/appHeader/index'

  export default {
    name: 'appContainer',
    components: {
      AppHeader,
      layout
    }
  }
</script>

<style scoped>

</style>
