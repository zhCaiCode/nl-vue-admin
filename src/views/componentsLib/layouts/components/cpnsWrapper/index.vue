<template>
  <div class="demo-block-page">
    <div class="demo-title" v-if="example">
      <h3 class="title1">
        {{ example.title }}
      </h3>
      <p class="sub-title">
        {{ example.des }}
      </p>
    </div>
    <div class="demo-block" v-if="example && example.meta">
      <div class="source">

        <div class="comp-block">
          <Search v-if="example.meta.component==='GlobalSearchMain'" />
          <Qrcode v-else-if="example.meta.component==='Qrcode'" />
          <MostPopularFuncSkrink v-else-if="example.meta.component==='MostPopularFuncSkrink'" />
          <MostPopularFuncEnlarge v-else-if="example.meta.component==='MostPopularFuncEnlarge'" v-bind="$attrs" :mostFunc="example.attrs.mostFunc"/>
          <component v-else :is="example.meta.component" :values="example.data.content" :title="example.title" :styles="{
            'display': 'inline-block',
            'margin': '20px'
          }" :width="300"
          v-bind="$attrs"
          v-on="$listeners"></component>
        </div>

      </div>
      <div :class="['meta', hide ? 'is-hide' : '']">
        <div class="description">
          <div>
            <p>
             {{ example.meta.des }}
            </p>
          </div>
        </div>
        <div class="highlight">
          <pre><code class="html hljs xml" v-html="example.meta.template"></code></pre>
        </div>
      </div>
      <div :class="[hide ? 'btn-show' : 'btn-hide', 'btn-text']" @click="handleHideclick">{{ hide ? '显示代码' : '隐藏代码' }}</div>

    </div>


  </div>
</template>
<script>
import model from '../../../data/staticPanel/model.json'
import Search from '@/views/componentsLib/components/globalSearch/main.vue'
import Qrcode from '@/views/componentsLib/components/qrcode/qrcodePanel.vue'
import MostPopularFuncEnlarge from '@/views/componentsLib/commonMenu/MostPopularFuncEnlarge'
import MostPopularFuncSkrink from '@/views/componentsLib/commonMenu/MostPopularFuncSkrink'
export default {
  name: 'CpnsWrapper',
  components:{Search,Qrcode,MostPopularFuncEnlarge,MostPopularFuncSkrink},
  props:{
    example:{
      type:Object,
      default:null
    }
  },
  data() {
    return {
      hide: false,
      models: {
        title: '型号',
        content: [
          ...model
        ]
      },
    }
  },
  mounted() {
    // var htmlStr = `
    // &lt;template&gt;
    //     &lt;el-form ref="form" :model="form" label-width="80px"&gt;
    //         &lt;el-form-item label="活动名称"&gt;
    //             &lt;el-input v-model="form.name"&gt;&lt;/el-input&gt;
    //         &lt;/el-form-item&gt;
    //         &lt;el-form-item label="活动区域"&gt;
    //             &lt;el-select v-model="form.region" placeholder="请选择活动区域"&gt;
    //             &lt;el-option label="区域一" value="shanghai"&gt;&lt;/el-option&gt;
    //             &lt;el-option label="区域二" value="beijing"&gt;&lt;/el-option&gt;
    //             &lt;/el-select&gt;
    //         &lt;/el-form-item&gt;
    //         &lt;el-form-item label="活动时间"&gt;
    //             &lt;el-col :span="11"&gt;
    //             &lt;el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"&gt;&lt;/el-date-picker&gt;
    //             &lt;/el-col&gt;
    //             &lt;el-col class="line" :span="2"&gt;-&lt;/el-col&gt;
    //             &lt;el-col :span="11"&gt;
    //             &lt;el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"&gt;&lt;/el-time-picker&gt;
    //             &lt;/el-col&gt;
    //         &lt;/el-form-item&gt;
    //         &lt;el-form-item label="即时配送"&gt;
    //             &lt;el-switch v-model="form.delivery"&gt;&lt;/el-switch&gt;
    //         &lt;/el-form-item&gt;
    //         &lt;el-form-item label="活动性质"&gt;
    //             &lt;el-checkbox-group v-model="form.type"&gt;
    //             &lt;el-checkbox label="美食/餐厅线上活动" name="type"&gt;&lt;/el-checkbox&gt;
    //             &lt;el-checkbox label="地推活动" name="type"&gt;&lt;/el-checkbox&gt;
    //             &lt;el-checkbox label="线下主题活动" name="type"&gt;&lt;/el-checkbox&gt;
    //             &lt;el-checkbox label="单纯品牌曝光" name="type"&gt;&lt;/el-checkbox&gt;
    //             &lt;/el-checkbox-group&gt;
    //         &lt;/el-form-item&gt;
    //         &lt;el-form-item label="特殊资源"&gt;
    //             &lt;el-radio-group v-model="form.resource"&gt;
    //             &lt;el-radio label="线上品牌商赞助"&gt;&lt;/el-radio&gt;
    //             &lt;el-radio label="线下场地免费"&gt;&lt;/el-radio&gt;
    //             &lt;/el-radio-group&gt;
    //         &lt;/el-form-item&gt;
    //         &lt;el-form-item label="活动形式"&gt;
    //             &lt;el-input type="textarea" v-model="form.desc"&gt;&lt;/el-input&gt;
    //         &lt;/el-form-item&gt;
    //         &lt;el-form-item&gt;
    //             &lt;el-button type="primary" @click="onSubmit"&gt;立即创建&lt;/el-button&gt;
    //             &lt;el-button&gt;取消&lt;/el-button&gt;
    //         &lt;/el-form-item&gt;
    //     &lt;/el-form&gt;
    // &lt;/template&gt;
    // &lt;script&gt;
    //         export default {
    //             data() {
    //             return {
    //                 form: {
    //                 name: '',
    //                 region: '',
    //                 date1: '',
    //                 date2: '',
    //                 delivery: false,
    //                 type: [],
    //                 resource: '',
    //                 desc: ''
    //                 }
    //             }
    //             },
    //             methods: {
    //             onSubmit() {
    //                 console.log('submit!');
    //             }
    //             }
    //         }
    //     &lt;/script&gt;
    //             `
    // let htmlStr = this.example.meta.template
    // function escapeHtml(unsafe) {
    //   return unsafe
    //     .replace(/&/g, "&amp;")
    //     .replace(/</g, "&lt;")
    //     .replace(/>/g, "&gt;")
    //     .replace(/"/g, "&quot;")
    //     .replace(/'/g, "&apos;");
    // }

    // document.querySelector('.highlight pre code').innerHTML = htmlStr;

    hljs.highlightAll();
  },
  methods: {
    handleHideclick() {
      this.hide = !this.hide
    }
  }
}
</script>

<style lang="scss" scoped>
.source {
  background-color: #fff;
  padding: 24px;
  border-bottom: 1px solid #e8e8e8;
}

.demo-title {
  overflow: hidden;
  height: 150px;
}

.demo-block {
  border: 1px solid #e8e8e8;

  &:hover {
    box-shadow: 0px 0px 8px #e8e8e8;
  }
}

.demo-block .source {
  padding: 24px
}

.demo-block .meta {
  background-color: #fafafa;
  border-top: 1px solid #eaeefb;
  /* overflow: hidden; */
  /* height: 0; */
  transition: height .2s
}

.demo-block .description {
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  font-size: 14px;
  line-height: 22px;
  color: #666;
  word-break: break-word;
  margin: 10px;
  background-color: #fff
}

.demo-block .description p {
  margin: 0;
  line-height: 26px
}

.demo-block .description code {
  color: #5e6d82;
  background-color: #e6effb;
  margin: 0 4px;
  display: inline-block;
  padding: 1px 5px;
  font-size: 12px;
  border-radius: 3px;
  height: 18px;
  line-height: 18px
}

.demo-block .highlight pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.demo-block .highlight code.hljs {
  margin: 0;
  border: none;
  max-height: none;
  border-radius: 0
}

.demo-block .highlight code.hljs:before {
  content: none
}

.demo-block .demo-block-control {
  border-top: 1px solid #eaeefb;
  height: 44px;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  text-align: center;
  margin-top: -1px;
  color: #d3dce6;
  cursor: pointer;
  position: relative
}

.demo-block .demo-block-control.is-fixed {
  position: fixed;
  bottom: 0;
  width: 868px
}

.demo-block .demo-block-control i {
  font-size: 16px;
  line-height: 44px;
  transition: .3s
}

.demo-block .demo-block-control i.hovering {
  transform: translateX(-40px)
}

.demo-block .demo-block-control>span {
  position: absolute;
  transform: translateX(-30px);
  font-size: 14px;
  line-height: 44px;
  transition: .3s;
  display: inline-block
}

.demo-block .demo-block-control:hover {
  color: #409eff;
  background-color: #f9fafc
}

.demo-block .demo-block-control .text-slide-enter,
.demo-block .demo-block-control .text-slide-leave-active {
  opacity: 0;
  transform: translateX(10px)
}

.demo-block .demo-block-control .control-button {
  line-height: 26px;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  padding-left: 5px;
  padding-right: 25px
}

.title1 {
  margin: 55px 0px 20px;
  font-size: 24px;
}

.sub-title {
  font-size: 16px;
  color: rgb(94, 109, 130);
  line-height: 1.5em;
}

.demo-block {
  height: calc(100% - 150px);
}

.meta {
  min-height: 600px;
  border-bottom: 1px solid #e8e8e8;
}

.meta.is-hide {
  display: none;
}

#dhwb {
  width: 100%;
  min-height: 400px;
}

.btn-text {
  height: 46px;
  background-color: #fff;
  font-size: 16px;
  color: #409eff;
  text-align: center;
  line-height: 46px;
  cursor: pointer;

  &:hover {
    background-color: #FAF9FC;
    box-shadow: 0px 0px 8px #e8e8e8;
  }
}
</style>
