<template>
  <div class="envInfo" v-once>
    <h3 class="envInfo__title" v-if="envs && envs.length">
      适用运行环境:
    </h3>
    <el-tooltip v-if="envs && envs.length" effect="dark" :content="content" placement="top">
      <div class="envInfo__body">
        <ul class="overflow-text">
          <li v-for="(n,index) in names" class="env-names">
            {{n}}
          </li>
        </ul>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
  export default {
    name: 'EnvInfo',
    props: {
      envs: {
        type: Array,
        default: null
      }
    },
    computed: {
      content() {
        return this.envs.length ? this.envs.map(e => e.envName).join(',') : ''
      },
      names() {
        return this.envs.length ? this.envs.map(e => e.envName) || [] : []
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep.el-tooltip {
    padding: 0;
    margin: 0;
  }

  .envInfo__title, .envInfo__body {
    margin: 0;
    padding: 4px 16px;
    max-height: 60px;
    line-height: 30px;
    font-weight: 600;
    max-width: 100%;
    overflow: hidden;
    /*text-overflow: ellipsis;*/
  }
  .envInfo__title{
    font-size: 14px;
    color: rgba(0,0,0,.85);
  }
  .envInfo__body{
    font-size: 12px;
    color: rgba(0,0,0,.55);
  }
  .envInfo__title {
    display: block;
  }

  .envInfo__body {
    display: inline-block;
  }
  .env-names{
    display: inline-block;
  }
  .env-names:not(:last-child){
    &:after{
      content: '|';
      display: inline-block;
      margin: 0 5px;
      font-weight: 400;
      /*height: 18px;*/
      /*color: #c2c2c2;*/
    }
  }
</style>
