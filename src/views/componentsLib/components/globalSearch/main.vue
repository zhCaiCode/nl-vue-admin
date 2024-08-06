<template>
  <div>
    <el-select
    ref="deviceGroupsSeletor"
    v-model="searchKey"
    filterable
    remote
    reserve-keyword
    :placeholder="'请输入关键字'"
    :remote-method="searchDeviceGroups"
    :loading="loading"
    popper-class="device-group-seletor-style"
    loading-text="Loading..."
    style="width:100%"
    @change="selectDeviceGroup"
  >
    <div
      v-for="item in options"
      :key="item.value"
    >
      <el-tooltip
        v-if="item.isOverflow"
        class="item"
        effect="dark"
        :content="item.fullPath"
        placement="bottom"
        popper-class="device-group-tip-style"
      >
        <el-option
          :label="item.label"
          :value="item.value"
        />
      </el-tooltip>
      <el-option
        v-if="!item.isOverflow"
        :label="item.label"
        :value="item.value"
      />
    </div>
  </el-select>
    <!-- <el-dialog
    title=""
    :visible.sync="isShowSearch"
    width="40%"
    :modal="true"
    :modal-append-to-body="false"
    :append-to-body="true"
    :show-close="false"
    :before-close="handleDeviceSearchClose"
    custom-class="device-groups-search-dialog"
  >
    <div slot="title">
      <el-select
        ref="deviceGroupsSeletor"
        v-model="searchKey"
        filterable
        remote
        reserve-keyword
        :placeholder="'请输入关键字'"
        :remote-method="searchDeviceGroups"
        :loading="loading"
        popper-class="device-group-seletor-style"
        loading-text="Loading..."
        style="width:100%"
        @change="selectDeviceGroup"
      >
        <div
          v-for="item in options"
          :key="item.value"
        >
          <el-tooltip
            v-if="item.isOverflow"
            class="item"
            effect="dark"
            :content="item.fullPath"
            placement="bottom"
            popper-class="device-group-tip-style"
          >
            <el-option
              :label="item.label"
              :value="item.value"
            />
          </el-tooltip>
          <el-option
            v-if="!item.isOverflow"
            :label="item.label"
            :value="item.value"
          />
        </div>
      </el-select>
    </div>
  </el-dialog> -->
  </div>
</template>

<script>
  export default {
    name:"GlobalSearchMain",
    data() {
    return {
      loading: false,
      isShowSearch: true,
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
      activeTab: 'menus',
      activeMenu: '',
      ParentPath: '',
      sonPath: '',
      searchKey: '',
      options: [],
      activeMenu2: 'zhsz',
      activeCommonMenu: '',
      timer: null,
      menuOffset: {
        offsetLeft: 0,
        offsetWidth: 0,
        clientX: 0,
        clientY: 0
      },
      // headerStyle: {
      //   height: '118px',
      //   width: '100%',
      //   'background-repeat': ' no-repeat',
      //   'background-size': 'cover'
      //
      // }
      isOpen: false
    }
  },
  methods: {
    goAbout() {
      this.isShowAbout = true
    },
    closeAbout() {
      this.isShowAbout = false
    },
    gotoIndex() {
      this.$router.push('/')
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
      this.$store.dispatch('user/getUserPermissions')
    },
    // 关闭设备组搜索组件
    handleDeviceSearchClose() {
      this.isShowSearch = false
      this.searchKey = ''
      this.$set(this, 'options', [])
    },
    // 选中设备组时
    selectDeviceGroup(value) {
      const query = {
        tg_num: value,
        page: 1,
        limit: 10
      }
      this.handleDeviceSearchClose()
      if (this.$route.fullPath !== '/') {
        this.$store.commit('business/SET_SEARCH_DEVICES', { options: { ...query }, callback: this.getDevices })
      } else {
        this.getDevices(query)
      }
      if (this.$refs?.mainLayout?.activeTab) {
        this.$refs.mainLayout.activeTab = 'devices'
      } else {
        this.$router.push('/')
        setTimeout(() => {
          this.$refs?.mainLayout && (this.$refs.mainLayout.activeTab = 'devices')
        }, 2000)
      }
    },
    // 根据关键字搜索设备组
    searchDeviceGroups(val) {
      if (val !== '') {
        this.loading = true
        this.debounce(() => {
          const query = {
            tg_name: val
          }
          searchDeviceGroups(query).then(res => {
            if (res.code > 0) {
              const data = res.data || []
              this.$set(this, 'options', data)
              this.loading = false
            } else {
              const msg = res.msg
              this.$message.error(msg)
              this.loading = false
            }
          }).catch(err => {
            this.$message.error(err)
          })
        }, 1000)()
      } else {
        this.$set(this, 'options', [])
      }
    },
    showSearchBar() {
      this.isShowSearch = true
      // 打开设备组搜索组件时 输入框自动获取焦点
      this.$nextTick(() => {
        this.$refs?.deviceGroupsSeletor?.$children?.[0].focus()
      })
    },
    initOptions() {
      // 语言环境初始化
      const lang = this.$store.getters.language
      Cookies.set('language', lang)
      this.$i18n.locale = lang
      this.setClasstoBody(lang)
    },
    setClasstoBody(lang) {
      document.body.setAttribute('class', lang)
    },
    // 打开系统消息弹窗
    openSystemMsgPop() {
      this.isOpen = true
    },
    async getDevices(params) {
      // 调接口
      await this.$store.dispatch('business/getDevicesAction', params)
    },
    // 关闭系统消息弹窗
    closePop() {
      this.isOpen = false
    },
    openChatPop() {
      // this.isChatOpen = true
      this.isChatOpen = !this.isChatOpen
      //   console.log('onlineRole', this.onlineRole)
    },
    closeChatPop() {
      this.isChatOpen = false
    },
    // 语言切换回调
    langChangeCallback(e) {},
    // 初始化键盘打开设备组搜索 => ctrl + shift + k 打开设备组搜索
    initKeyboardOpen() {
      window.addEventListener('keyup', (e) => {
        if (this.isShowSearch) return
        if (e.target?.localName === 'input' || e.target?.className?.indexOf('input') !== -1) return
        if (e.key === '/') {
          this.isShowSearch = true
          // 打开设备组搜索组件时 输入框自动获取焦点
          this.$nextTick(() => {
            this.$refs?.deviceGroupsSeletor?.$children?.[0].focus && this.$refs.deviceGroupsSeletor.$children[0].focus()
          })
        }
      })
    }
  }
  }
</script>

<style lang="scss" scoped>

</style>
