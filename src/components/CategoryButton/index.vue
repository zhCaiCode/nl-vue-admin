<template>
  <div class="cb-item">
    <div :class="`cb-btn ${item.active?'active':''}`">
      <a href="#" :class="`cb_tit ${item.active?'active':''}`"
         @click="handleMenu">{{item.title+(`(${item.count})`)}}</a>
      <span v-if="showExpand" :class="`plus ${className}`" @click="clickPlus"></span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'CategoryButton',
    props: {
      item: {
        type: Object,
        default: () => {
        }
      },
      showExpand:{
        type:Boolean,
        default:()=>(this.item.children && this.item.children.length)
      }
    },
    data() {
      return {
        className: ''
      }
    },
    methods: {
      clickPlus() {
        this.$parent.$children.map((el,index) => {
          if (el.$vnode.componentOptions.tag === 'CategoryButton') {
            if (typeof this.$vnode.key === 'number') {
              if(this.$vnode.key === index){
                if (!this.className) {
                  this.className = 'plus_jh'
                } else {
                  this.className = ''
                }
              }else{
                el.className = ''
              }
            } else {
              console.log(el.$vnode.componentOptions.propsData.item.title === this.$vnode.key)
              if (el.$vnode.componentOptions.propsData.item.title === this.$vnode.key) {
                if (!this.className) {
                  this.className = 'plus_jh'
                } else {
                  this.className = ''
                }
              } else {
                el.className = ''
              }
            }
          }
        })
        this.$emit('handle-fold', this.item, !!this.className)
      },
      handleMenu() {
        this.$emit('click', this.item)
      }
    }
  }
</script>

<style scoped lang="scss">
  .cb-item {
    margin: 12px 0;

    .cb-btn {
      height: 48px;
      line-height: 48px;
      position: relative;
    /*  background: url('~@/assets/images/jg_bg.png') no-repeat center center / 100% 100%;*/
      background-color: #F9F9F9;

      a {
        font-size: 18px;
        padding-left: 18px;
        text-decoration: none;
        display: inline-block;
        width: 85%;
        color: #666;

        &:hover {
          color: #434343;
          /*color: #b10c10;*/
        }
      }

      .active {
        color: #434343;
        font-weight: bold;
      }

      .plus {
        width: 24px;
        height: 24px;
        background: url('~@/assets/images/add.png') no-repeat center center / 100% 100%;
        display: inline-block;
        float: right;
        margin-top: 12px;
        margin-right: 16px;
        cursor: pointer;
        position: absolute;
        right: 0;
      }

      .plus_jh {
        background: url('~@/assets/images/jh.png') no-repeat center center / 100% 100%;
      }
    }
    .cb-btn.active{
      background-color: #EFF6FE;
    }
  }

  @media screen and (min-width: 1400px) and (max-width: 1900px) {
    span {
      margin: 0px;
      outline: none;
      padding: 0;
    }
  }
</style>
