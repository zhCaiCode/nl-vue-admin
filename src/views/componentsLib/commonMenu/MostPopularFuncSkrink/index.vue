<template>
  <el-card class="funcSkrinkCard">
    <div slot="header" class="funcHeader">
      <el-tooltip class="item" effect="dark" :content="'常用菜单'" placement="top-start">
        <el-image :src="enlarge" class="shrinkIcon" @click="changeEnlarge()" />
      </el-tooltip>
    </div>

  </el-card>
</template>

<script>
import enlarge from '@/assets/icon/enlarge.svg'

export default {
  name: 'MostPopularFuncSkrink',

  data() {
    return {
      enlarge
    }
  },
  methods: {
    routerLink(path) {
      return
      this.$router.replace({ path: path })
      this.$emit('linkHandler', path)
    },
    changeEnlarge() {
      this.$emit('changeEnlarge')
    }
  }
}
</script>

<style lang="scss">
.funcSkrinkCard {
  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.15);
  border-radius: 10px;
  /*top: 33%; 这是垂直居中*/

  width: 56px;
  height: 51px;
  /*height: 281px;*/
  .el-card__body {
    padding: 0px;
  }
  .el-card__header {
    padding: 15px;
    // background: rgba(12,65,150,0.06);
    // background: #E8E8E8;
    background: #F5F8FA;
  }
  .funcHeader {
    display: flex;
    .shrinkIcon {
      margin: auto;
      height: 18px;
      width: 18px;
      img {
        height: 18px;
        width: 18px;
        cursor: pointer;
      }
    }
  }
  .funcBoxStyle {
    width: 56px !important;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .funcItemStyle {
      width: 100%;
      height: 44px;
      display: flex;
      .itemIcon {
        height: 28px;
        width: 28px;
        margin: auto;
        img {
          height: 28px;
          width: 28px;
          cursor: pointer;
        }
      }
      &:hover {
        background: rgba(12,65,150,0.06);
      }
    }
  }
}
</style>
