


export const LIST = [
  {
    title:'收缩状态',
    des:'菜单收缩状态',
    meta:{
      component:'MostPopularFuncSkrink',
      des:'菜单收缩状态，可配合定位',
      template:`
     &lt;template&gt;
          &lt;el-card class=&quot;funcSkrinkCard&quot;&gt;
            &lt;div slot=&quot;header&quot; class=&quot;funcHeader&quot;&gt;
              &lt;el-tooltip class=&quot;item&quot; effect=&quot;dark&quot; :content=&quot;&apos;常用菜单&apos;&quot; placement=&quot;top-start&quot;&gt;
                &lt;el-image :src=&quot;enlarge&quot; class=&quot;shrinkIcon&quot; @click=&quot;changeEnlarge()&quot; /&gt;
              &lt;/el-tooltip&gt;
            &lt;/div&gt;

          &lt;/el-card&gt;
    &lt;/template&gt;
      `
    },
    attrs:{
      mostFunc:[
        {
          label: '菜单1',
          ywdm: 'synthesis',
          path: '/deviceSetting/synthesisSetting',
          // img: comSetting
        },
        {
          label: '菜单2',
          ywdm: 'configuration',
          path: '/deviceSetting/scanSetting',
          // img: scanSetting
        },
        {
          label: '菜单3',
          ywdm: 'network',
          path: '/deviceSetting/wifi',
          // img: wifiSetting
        },
        {
          label:'菜单4',
          ywdm: 'apn',
          path: '/deviceSetting/apn',
          // img: apnSetting
        },

      ]
    }
  },
  {
    title:'菜单展开状态',
    des:'菜单展开状态，可配合定位',
    meta:{
      component:'MostPopularFuncEnlarge',
      des:'菜单展开状态，可配合定位',
      template:`
     &lt;template&gt;
      &lt;el-card class=&quot;funcEnlargeCard&quot;&gt;
        &lt;div slot=&quot;header&quot; class=&quot;funcHeader&quot;&gt;
          &lt;span&gt;{{&apos;常用菜单&apos; }}&lt;/span&gt;&lt;el-image :src=&quot;shrink&quot; class=&quot;shrinkIcon&quot; @click=&quot;changeEnlarge()&quot; /&gt;
        &lt;/div&gt;
        &lt;div class=&quot;funcBoxStyle&quot;&gt;
          &lt;div v-for=&quot;(item,index) in mostFunc&quot; :key=&quot;item.path+index&quot; class=&quot;funcItemStyle&quot; @click=&quot;routerLink(item.path)&quot;&gt;
            &lt;div class=&quot;itemLayout&quot;&gt;
              &lt;img :src=&quot;item.img&quot; class=&quot;itemIcon&quot;&gt;&lt;span :title=&quot;item.label&quot;&gt;{{ item.label }}&lt;/span&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/el-card&gt;
&lt;/template&gt;

&lt;script&gt;
import shrink from &apos;@/assets/icon/shrink.svg&apos;

export default {
  name: &apos;MostPopularFuncSkrink&apos;,
  props: {
    mostFunc: {
      type: Array,
      default: () =&gt; []
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
      this.$emit(&apos;linkHandler&apos;, path)
    },
    changeEnlarge() {
      this.$emit(&apos;changeEnlarge&apos;)
    }
  }
}
&lt;/script&gt;

&lt;style lang=&quot;scss&quot;&gt;
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
      &amp;:hover {
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
&lt;/style&gt;
&lt;style lang=&quot;scss&quot; scoped&gt;

&lt;/style&gt;

      `
    },
    attrs:{
      mostFunc:[
        {
          label: '菜单1',
          ywdm: 'synthesis',
          path: '/deviceSetting/synthesisSetting',
          // img: comSetting
        },
        {
          label: '菜单2',
          ywdm: 'configuration',
          path: '/deviceSetting/scanSetting',
          // img: scanSetting
        },
        {
          label: '菜单3',
          ywdm: 'network',
          path: '/deviceSetting/wifi',
          // img: wifiSetting
        },
        {
          label:'菜单4',
          ywdm: 'apn',
          path: '/deviceSetting/apn',
          // img: apnSetting
        },

      ]
    }
  }
]

export const attrData = [
  {
    params:'mostFunc',
    des:'菜单',
    type:'array',
    selectable:'',
    defaultValue:'',
  },
]
export const eventData=[
  {
    name:'',
    des:'',
    params:''
  }
]
