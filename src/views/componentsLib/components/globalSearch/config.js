import model from '../../data/staticPanel/model.json'
import result from '../../data/staticPanel/result.json'
import total from '../../data/staticPanel/total.json'
export const COLOR={
  green:'green',
  oringe:'oringe',
  pink:'pink',
  blue:'1890FF',
  purple:'purple'
}

export const LIST = [
  {
    title:'基础用法',
    des:'全局搜索框，用于搜索，示例为常显示，可以通过设置快捷键呼出',
    meta:{
      component:'GlobalSearchMain',
      des:'可以通过设置快捷键呼出方式来呼出搜索框，并且可以进行远程搜索，示例为常显示，可嵌套el-dialog使用',
      template:`&lt;el-dialog
      title=&quot;&quot;
      :visible.sync=&quot;isShowSearch&quot;
      width=&quot;40%&quot;
      :modal=&quot;true&quot;
      :modal-append-to-body=&quot;false&quot;
      :append-to-body=&quot;true&quot;
      :show-close=&quot;false&quot;
      :before-close=&quot;handleDeviceSearchClose&quot;
      custom-class=&quot;device-groups-search-dialog&quot;
    &gt;
      &lt;div slot=&quot;title&quot;&gt;
        &lt;el-select
          ref=&quot;deviceGroupsSeletor&quot;
          v-model=&quot;searchKey&quot;
          filterable
          remote
          reserve-keyword
          :placeholder=&quot;$t(&apos;device.input_key_search_device_group_tip&apos;)&quot;
          :remote-method=&quot;searchDeviceGroups&quot;
          :loading=&quot;loading&quot;
          popper-class=&quot;device-group-seletor-style&quot;
          loading-text=&quot;Loading...&quot;
          style=&quot;width:100%&quot;
          @change=&quot;selectDeviceGroup&quot;
        &gt;
          &lt;div
            v-for=&quot;item in options&quot;
            :key=&quot;item.value&quot;
          &gt;
            &lt;el-tooltip
              v-if=&quot;item.isOverflow&quot;
              class=&quot;item&quot;
              effect=&quot;dark&quot;
              :content=&quot;item.fullPath&quot;
              placement=&quot;bottom&quot;
              popper-class=&quot;device-group-tip-style&quot;
            &gt;
              &lt;el-option
                :label=&quot;item.label&quot;
                :value=&quot;item.value&quot;
              /&gt;
            &lt;/el-tooltip&gt;
            &lt;el-option
              v-if=&quot;!item.isOverflow&quot;
              :label=&quot;item.label&quot;
              :value=&quot;item.value&quot;
            /&gt;
          &lt;/div&gt;
        &lt;/el-select&gt;
      &lt;/div&gt;
    &lt;/el-dialog&gt;
    export default {
  name: &apos;Container&apos;,
  components: {
    About,
    // ContextMenu,
    NavBar,
    SystemMsg,
    chatting
    // GroupSearch,
    // SiderBar
    // PageMain
  },
  inject: [&apos;app&apos;],
  mixins: [containerMixin],
  data() {
    return {
      banner,
      bannerLogo,
      menu,
      device,
      loading: false,
      isShowSearch: false,
      isFold: false,
      drawer: false,
      showCtxMenu: false,
      menuVisible: false,
      isGroup: false,
      isShowAbout: false,
      isChatOpen: false,
      // online_role: 1,
      // groupList: [],
      menuArr: [],
      activeTab: &apos;menus&apos;,
      activeMenu: &apos;&apos;,
      ParentPath: &apos;&apos;,
      sonPath: &apos;&apos;,
      searchKey: &apos;&apos;,
      options: [],
      activeMenu2: &apos;zhsz&apos;,
      activeCommonMenu: &apos;&apos;,
      timer: null,
      menuOffset: {
        offsetLeft: 0,
        offsetWidth: 0,
        clientX: 0,
        clientY: 0
      },
      // headerStyle: {
      //   height: &apos;118px&apos;,
      //   width: &apos;100%&apos;,
      //   &apos;background-repeat&apos;: &apos; no-repeat&apos;,
      //   &apos;background-size&apos;: &apos;cover&apos;
      //
      // }
      isOpen: false,
      popW: POP_SIZE.large.width,
      popH: POP_SIZE.large.height
    }
  },
  computed: {
    curYear() {
      const date = new Date()
      return date.getFullYear()
    },
    noValiadte() {
      return this.$store.getters[&apos;business/noValiadte&apos;] || []
    },
    pop_size() {
      return POP_SIZE
    },
    onlineRole() {
      const userInfo = JSON.parse(sessionStorage.getItem(&apos;userInfo&apos;)) || {}
      const { onlineRole } = userInfo || null
      return onlineRole
    }
  },
  watch: {
    &apos;$route&apos;: {
      deep: true,
      handler(val) {
        if (!val || this.noValiadte?.indexOf(val.path) !== -1 || val?.path?.startsWith(&apos;/user&apos;) || val?.path?.startsWith(&apos;/person&apos;)) return
        // const pathArr = val.path.split(&apos;/&apos;)
        const params = {
          name: val.path || &apos;&apos;
        }
        const func = () =&gt; {
          this.$store.dispatch(&apos;business/hobbyRecord&apos;, params)
        }
        this.debounce(func, 200)
      }
    }
  },
  created() {
    this.debounce(this.initPermission, 1000) &amp;&amp; this.app.initPromiseList.push(this.debounce(this.initPermission, 1000)())
  },
  mounted() {
    this.initOptions()
    this.initKeyboardOpen()
  },
  methods: {
    goAbout() {
      this.isShowAbout = true
    },
    closeAbout() {
      this.isShowAbout = false
    },
    gotoIndex() {
      this.$router.push(&apos;/&apos;)
    },
    debounce(fn, delay) {
      const _this = this
      return function() {
        if (_this.timer !== null) {
          clearTimeout(_this.timer)
          _this.timer = null
        }
        _this.timer = setTimeout(fn, delay)
      }
    },
    initPermission() {
      this.$store.dispatch(&apos;user/getUserPermissions&apos;)
    },
    // 关闭设备组搜索组件
    handleDeviceSearchClose() {
      this.isShowSearch = false
      this.searchKey = &apos;&apos;
      this.$set(this, &apos;options&apos;, [])
    },
    // 选中设备组时
    selectDeviceGroup(value) {
      const query = {
        tg_num: value,
        page: 1,
        limit: 10
      }
      this.handleDeviceSearchClose()
      if (this.$route.fullPath !== &apos;/&apos;) {
        this.$store.commit(&apos;business/SET_SEARCH_DEVICES&apos;, { options: { ...query }, callback: this.getDevices })
      } else {
        this.getDevices(query)
      }
      if (this.$refs?.mainLayout?.activeTab) {
        this.$refs.mainLayout.activeTab = &apos;devices&apos;
      } else {
        this.$router.push(&apos;/&apos;)
        setTimeout(() =&gt; {
          this.$refs?.mainLayout &amp;&amp; (this.$refs.mainLayout.activeTab = &apos;devices&apos;)
        }, 2000)
      }
    },
    // 根据关键字搜索设备组
    searchDeviceGroups(val) {
      if (val !== &apos;&apos;) {
        this.loading = true
        this.debounce(() =&gt; {
          const query = {
            tg_name: val
          }
          searchDeviceGroups(query).then(res =&gt; {
            if (res.code &gt; 0) {
              const data = res.data || []
              this.$set(this, &apos;options&apos;, data)
              this.loading = false
            } else {
              const msg = res.msg
              this.$message.error(msg)
              this.loading = false
            }
          }).catch(err =&gt; {
            this.$message.error(err)
          })
        }, 1000)()
      } else {
        this.$set(this, &apos;options&apos;, [])
      }
    },
    showSearchBar() {
      this.isShowSearch = true
      // 打开设备组搜索组件时 输入框自动获取焦点
      this.$nextTick(() =&gt; {
        this.$refs?.deviceGroupsSeletor?.$children?.[0].focus()
      })
    },
    initOptions() {
      // 语言环境初始化
      const lang = this.$store.getters.language
      Cookies.set(&apos;language&apos;, lang)
      this.$i18n.locale = lang
      this.setClasstoBody(lang)
    },
    setClasstoBody(lang) {
      document.body.setAttribute(&apos;class&apos;, lang)
    },
    // 打开系统消息弹窗
    openSystemMsgPop() {
      this.isOpen = true
    },
    async getDevices(params) {
      // 调接口
      await this.$store.dispatch(&apos;business/getDevicesAction&apos;, params)
    },
    // 关闭系统消息弹窗
    closePop() {
      this.isOpen = false
    },
    openChatPop() {
      // this.isChatOpen = true
      this.isChatOpen = !this.isChatOpen
      //   console.log(&apos;onlineRole&apos;, this.onlineRole)
    },
    closeChatPop() {
      this.isChatOpen = false
    },
    // 语言切换回调
    langChangeCallback(e) {},
    // 初始化键盘打开设备组搜索 =&gt; ctrl + shift + k 打开设备组搜索
    initKeyboardOpen() {
      window.addEventListener(&apos;keyup&apos;, (e) =&gt; {
        if (this.isShowSearch) return
        if (e.target?.localName === &apos;input&apos; || e.target?.className?.indexOf(&apos;input&apos;) !== -1) return
        if (e.key === &apos;/&apos;) {
          this.isShowSearch = true
          // 打开设备组搜索组件时 输入框自动获取焦点
          this.$nextTick(() =&gt; {
            this.$refs?.deviceGroupsSeletor?.$children?.[0].focus &amp;&amp; this.$refs.deviceGroupsSeletor.$children[0].focus()
          })
        }
      })
    }
  }
}`
    }
  }
]

export const attrData = [
  {
    params:'filterable',
    des:'是否过滤',
    type:'boolean',
    selectable:'true/false',
    defaultValue:'true',
  },
  {
    params:'remote',
    des:'是否开启远程搜索',
    type:'boolean',
    selectable:'true/false',
    defaultValue:'true'
  },
  {
    params:'remote-method',
    des:'远程搜索方法',
    type:'function',
    selectable:'',
    defaultValue:'(val)=>{}',
  },
  {
    params:'loading',
    des:'是否显示加载状态',
    type:'boolean',
    selectable:'true/false',
    defaultValue:'true',
  },
  {
    params:'style',
    des:'样式',
    type:'object',
    selectable:'',
    defaultValue:'',
  },
  {
    params:' loading-text',
    des:'加载文本',
    type:'string',
    selectable:'',
    defaultValue:'',
  }
]
export const eventData=[
  {
    name:'',
    des:'',
    params:''
  }
]
