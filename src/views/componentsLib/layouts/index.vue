<template>
  <div class="lib-layouts">
    <div class="left column">
      <div class="block">
        <router-view />
      </div>
      <div class="attributes">
       <div   v-if="attrData.length">
        <h3>Attributes</h3>
        <el-table
        :data="attrData"
        style="width: 100%">
        <el-table-column
          v-for="attr in attrColumn"
          :key="attr.prop"
          :prop="attr.prop"
          :label="attr.label">
        </el-table-column>
      </el-table>
       </div>
      <div  v-if="eventData.length">
        <h3>Events</h3>
      <el-table

      :data="eventData"
      style="width: 100%">
      <el-table-column
        v-for="col in eventColumn"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label">
      </el-table-column>
    </el-table>
      </div>
      </div>
    </div>
    <!-- <div class="right column">
        <div class="block">
          <h3>Attributes</h3>
          <el-table
          :data="[]"
          style="width: 100%">
          <el-table-column
            v-for="attr in attrColumn"
            :key="attr.prop"
            :prop="attr.prop"
            :label="attr.label">
          </el-table-column>
        </el-table>
        <h3>Events</h3>
        <el-table
        :data="[]"
        style="width: 100%">
        <el-table-column
          v-for="col in eventColumn"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label">
        </el-table-column>
      </el-table>
        </div>
    </div> -->
  </div>
</template>

<script>
import dataCard from './../components/dataCard/index.vue'
  export default {
    name: 'LibLayouts',
    components: {
      dataCard
    },
    data(){
      return {

        attrColumn:[
          {
            prop:'params',
            label:'参数'
          },
          {
            prop:'des',
            label:'说明'
          },
          {
            prop:'type',
            label:'类型'
          },
          {
            prop:'selectable',
            label:'可选值'
          },
          {
            prop:'defaultValue',
            label:'默认值'
          }
        ],
        eventColumn:[
          {
            prop:'name',
            label:'事件名'
          },
          {
            prop:'des',
            label:'说明'
          },
          {
            prop:'params',
            label:'参数'
          }
        ],
        slotColumn:[

        ]
      }
    },
    computed:{
      attrData(){
        return this.$store.getters['libarary/attrData']
      },
      eventData(){
        return this.$store.getters['libarary/eventData']
      }
    }


  }
</script>

<style lang="scss" scoped>
.lib-layouts{
  overflow:auto;
  height: 100%;
}
 .column{
 /* float: left;*/
 margin: 0 auto;
 }
 .left{
  width: 70%;
  /*padding-right: 750px;*/
 }
 .right{
  width: 750px;
  margin-left: -750px;
 }
 .block{
  padding: 8px 16px;
 }
::v-deep .el-table th{
  background-color: #fff!important;
}
.right .block > h3{
  margin: 55px 0px 20px;
  font-size: 24px;
}
.attributes{
  margin-top: 50px;
  & > h3 {
    margin: 55px 0px 20px;
    font-size: 24px;
    font-weight: 500;
  }
}
</style>
