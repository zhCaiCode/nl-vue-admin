<template>
  <div class="comp-dataCard">
    <cpnsWrapper v-for="item in comps" :key="item.title" :example="item" @handleViewMore="showMore" v-bind="item.attrs"></cpnsWrapper>
  </div>
</template>

<script>
import data from '../../data/staticPanel/total.json'
import model from '../../data/staticPanel/model.json'
import result from '../../data/staticPanel/result.json'
// import StatisticPanel from './main.vue'
import cpnsWrapper from './../../layouts/components/cpnsWrapper/index.vue'
import {LIST,attrData} from './config'
export default {
  name: "libsDataCard",
  components:{ cpnsWrapper},
  data() {
    return {
      comps:LIST,
      list: {
        title:'终端数'
      },
      models:{
        title:'型号',
        content:[
          ...model
        ]
      },
      results:{
        title:'执行结果',
        content:[
          ...result
        ]
      }
    }
  },
  mounted(){
    this.list = {...this.list,...data}
    this.$store.commit('libarary/SET_ATTR_DATA',attrData)
  },
  methods:{
    showMore(e){
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped></style>
