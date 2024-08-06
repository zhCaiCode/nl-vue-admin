<template>
  <div>
    <cpnsWrapper v-for="item in comps" :key="item.title" :example="item"  v-bind="item.attrs"></cpnsWrapper>
  </div>
</template>

<script>
import cpnsWrapper from './../../layouts/components/cpnsWrapper/index.vue'
import {LIST,attrData} from './config'

  export default {
    name:'Qrcode',
    components:{cpnsWrapper},
    data() {
    return {
      comps:LIST
    }
  },
  mounted(){
    this.$store.commit('libarary/SET_ATTR_DATA',attrData)
  },
  }
</script>

<style lang="scss" scoped>

</style>
