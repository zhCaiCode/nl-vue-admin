<template>
  <el-card class="funcEnlargeCard">
    <div slot="header" class="funcHeader">
      <span>{{'常用菜单' }}</span><el-image :src="shrink" class="shrinkIcon" @click="changeEnlarge()" />
    </div>
    <div class="funcBoxStyle">
      <div v-for="(item,index) in mostFunc" :key="item.path+index" class="funcItemStyle" @click="routerLink(item.path)">
        <div class="itemLayout">
          <img :src="item.img" class="itemIcon"><span :title="item.label">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import shrink from '@/assets/icon/shrink.svg'

export default {
  name: 'MostPopularFuncSkrink',
  props: {
    mostFunc: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      shrink
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
.funcEnlargeCard {
  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.15);
  border-radius: 10px;
  /*top: 33%;*/

  width: 200px;
  min-width: 200px;
  /*height: 281px;*/
  /*min-height: 281px;*/
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
    span {
      font-size: 16px;
    }
    .shrinkIcon {
      margin: 0px 0px 0px 80px;
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
    width: 200px !important;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 100%;
    .funcItemStyle {
      cursor: pointer;
      width: 100%;
      min-width: 100%;
      height: 44px;
      .itemLayout {
        display: flex;
        margin: 8px 30px auto;
        height: 29px;
        /*width: 150px;*/
        min-width: 150px;
        span {
          /*font-size: 14px;*/
          line-height: 29px;
          margin-left: 10px;
        }
        .itemIcon {
          height: 28px;
          width: 28px;
          // vertical-align: middle;
          // img {
          //   height: 28px;
          //   width: 28px;
          // }
        }
      }
      &:hover {
        background: rgba(12,65,150,0.06);
      }
    }
  }
}
.en {
  .funcEnlargeCard {
    width: 270px;
    min-width: 240px;
    .funcHeader {
      .shrinkIcon {
        margin: 0px 0px 0px 55px;
      }
    }
    .funcBoxStyle {
      width: 240px !important;
      min-width: 240px;
      .itemLayout {
        width: 220px;
        min-width: 220px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>

</style>
