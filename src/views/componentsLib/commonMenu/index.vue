<template>
  <div>
    <cpnsWrapper v-for="item in comps" :key="item.title" :example="item" ></cpnsWrapper>

  </div>
</template>

<script>
import MostPopularFuncSkrink from './MostPopularFuncSkrink'
import MostPopularFuncEnlarge from './MostPopularFuncEnlarge'
import comSetting from '@/assets/icon/comSetting.svg'
import scanSetting from '@/assets/icon/scan.svg'
import wifiSetting from '@/assets/icon/wifiSetting.svg'
import apnSetting from '@/assets/icon/apnSetting.svg'
import desktopSetting from '@/assets/icon/desktopSetting.svg'
import { LIST ,attrData} from './config'
import cpnsWrapper from '../layouts/components/cpnsWrapper/index.vue'

  export default {
    name:'MostMenu',
    components: {
      MostPopularFuncSkrink,
      MostPopularFuncEnlarge,
      cpnsWrapper
     },
     data() {
    return {
      comps:LIST,
      popH: '',
      popW: '',
      popAddTgW: '',
      popAddTgH: '',
      isRun: false,
      groupResolve: null,
      rootNode: null,
      showFileImport: false,
      isShowGroupManage: false,
      isShowAddGroup: false,
      selectedGroup: {},
      oldGroupData: {},
      editGroup: {},
      defaultExpandedKeys: [],
      isFold: false,
      drawer: false,
      showCtxMenu: false,
      menuVisible: false,
      isGroup: false,
      temp_tgName: '',
      // groupList: [],
      menuArr: [],
      defaultLeft: 17,
      mostFunc: [
        {
          label: '综合设置',
          ywdm: 'synthesis',
          path: '/deviceSetting/synthesisSetting',
          img: comSetting
        },
        {
          label: '扫码设置',
          ywdm: 'configuration',
          path: '/deviceSetting/scanSetting',
          img: scanSetting
        },
        {
          label:'wifi设置',
          ywdm: 'network',
          path: '/deviceSetting/wifi',
          img: wifiSetting
        },
        {
          label:'apn设置',
          ywdm: 'apn',
          path: '/deviceSetting/apn',
          img: apnSetting
        },
        {
          label: '桌面设置',
          ywdm: 'desk',
          path: '/deviceSetting/desktopSetting',
          img: desktopSetting
        }
      ],
      activeTab: 'menus',
      activeMenu: '',
      ParentPath: '',
      sonPath: '',
      activeMenu2: 'zhsz',
      activeCommonMenu: '',
      timer: null,
      menuOffset: {
        offsetLeft: 0,
        offsetWidth: 0,
        clientX: 0,
        clientY: 0
      },
      headerStyle: {
        height: '118px',
        width: '100%',
        'background-repeat': ' no-repeat',
        'background-size': 'cover'

      },
      isFixed: false,
      isEnlarge: false,
      isShowMost: true,
      functionMenus: [],
      value: [],
      list: [],
      loading: false,
      sliderX: ''
    }
  },
  mounted(){
    this.$store.commit('libarary/SET_ATTR_DATA',attrData)

  },
  computed: {
    groupList() {
      return this.$store.getters['business/groupList']
    },
    key() {
      return this.$route.path
    },
    userInfo() {
      return getSessionStorage('userInfo')
    },
    permissionMenu() {
      return this.$store.getters.permissions.menu
    },
    curTgNum() {
      return this.$store.getters['business/tg_num'] || ''
    },
    hobby() {
      return this.$store.getters?.permissions?.hobby || []
    },
    businessRoutes() {
      return constantRoutes.find(item => item.path === '/').children || []
    }
  },
  methods: {
    init() {
      this.groupMenus.map(item => {
        if (this.userInfo.usertype === 1 && item.index === 'rename') {
          item.hidden = true
        }
        return item
      })
      this.groupMenus = this.groupMenus.filter(menu => !menu.hidden)
      this.initConfig()
      this.app.initPromiseList.push(this.getDevicesGroups())
    },
    initMostMenu() {
      try {
        const business = []
        this.businessRoutes?.forEach(item => {
          if (item.path && !['/login', '/'].includes(item.path)) {
            if (item?.children?.length) {
              item?.children?.forEach(child => {
                if (!child.path) return
                const label = this.$t(child?.meta?.name) || child?.meta?.name || ''
                let path = item.path
                if (child.path !== '/') {
                  path += '/' + child.path
                }
                const ywdm = child.meta.ywdm || ''
                business.push({ label, path, ywdm })
              })
            }
          }
        })
        this.hobby?.map((hb, i) => {
          const h = business.find(b => b.path === hb) || false
          if (!h) return
          if (i > this.mostFunc.length - 1) return
          this.mostFunc.splice(i, 1, {
            ...this.mostFunc[i],
            label: h.label,
            path: h.path,
            ywdm: h.ywdm
          })
        })
      } catch (e) {
        //   console.log('initMostMenu Error...', e)
        this.$message.error('initMostMenu Error...')
        throw new Error(e)
      }
    },
    afterScanCode(parent) {
      const pageParams = {
        page: 1,
        size: 10,
        limit: 10
      }
      this.getDevices({ ...pageParams, loadingText: null })
    },
    sliderEnd(e) {
      document.body.onmousemove = null
      document.body.removeEventListener('mouseup', this.sliderEnd)
      this.sliderX = ''
    },
    sliderStart(e) {
      this.sliderX = e.clientX
      const dom = document.getElementById('articleAside')
      const clientW = dom.clientWidth
      document.body.onmousemove = event => {
        const distance = event.clientX - this.sliderX
        dom.style.cssText = `width:${clientW + distance}px`
        //   console.log(dom.style, distance, dom.clientWidth)
      }
      document.body.addEventListener('mouseup', this.sliderEnd)
      //   console.log('thisslederx')
    },
    async loadGroupList(node, resolve) {
      if (node.level === 0 || !node.level) {
        this.rootNode = node
        this.groupResolve = resolve
        const res = await this.getDevicesGroups()
        // console.log(res)
        resolve(res)
      }
      //   console.log('level...', node)

      if (!node?.data?.is_flag && node?.level !== 0) {
        getGroupNodes({ tg_num: node?.data?.tg_num }).then(res => {
          //   console.log('res...', res)
          if (res?.code > 0) {
            resolve(res.data)
          } else {
            resolve([])
          }
        })
      }
      if (node?.data?.is_flag) {
        resolve([])
      }
    },
    closeImportGroup() {
      this.showFileImport = false
    },
    getGroupforNode(tg_num) {
      return new Promise((resolve, reject) => {
        getGroupNodes({ tg_num }).then(res => {
          //   console.log('res...', res)
          if (res?.code > 0) {
            resolve(res.data)
          } else {
            resolve([])
          }
        })
      })
    },
    initFuctionMenus(children) {
      children.map(child => {
        if (!child?.children?.length) {
          if (this.permissionMenu.find(menu => menu.path === child.path)) {
            child.visible = true
          }
        } else {
          if (this.permissionMenu.find(menu => menu.path === child.path)) {
            child.visible = true
          }
          this.initFuctionMenus(child.children)
        }
        return child
      })
    },
    afterAddGroup(parent) {
      this.refeshGroup(parent)
      this.defaultExpandedKeys = [this.editGroup.tg_num]
      this.closeTgPop()
    },
    closeTgPop() {
      this.isShowAddGroup = false
      this.editGroup = {}
    },
    renameComplete() {
      const data = cloneDeep(this.selectedGroup) || null
      data.tg_name = this.temp_tgName
      //   console.log('data...', data)
      const editKeyArr = []
      const skipKey = ['isEdit', 'children']

      for (const key in data) {
        if (!skipKey.includes(key)) {
          if (data[key] !== this.oldGroupData[key]) {
            editKeyArr.push(key)
          }
        }
      }
      this.$set(data, 'isEdit', false)
      if (!editKeyArr.length) return
      const modifyKeys = ['p_tg_num', 'tg_num', 'tg_name', 'id']
      const reqData = {}
      modifyKeys.forEach(mk => {
        reqData[mk] = data[mk]
      })
      // this.debounce(() => {
      this.$store.dispatch('business/settingGroupInfo', reqData).then(res => {
        if (res && res.code > 0) {
          const success = this.$t('common.save_success')
          this.$message.success(success)
          this.selectedGroup.tg_name = this.temp_tgName
          this.temp_tgName = ''
          this.rootNode.childNodes = []
          this.loadGroupList(this.rootNode, this.groupResolve)
        } else {
          this.$message.error(res)
        }
      }).catch(error => {
        this.selectedGroup = this.oldGroupData
        this.$message.error(error)
      })
      // }, 1000)
    },
    keyuprename() {
      this.$set(this.selectedGroup, 'isEdit', false)
    },
    selectTgRightMenu(index) { // 组右键菜单点击事件
      const condition = {
        rename: 'rename',
        delete: 'delete',
        add: 'add',
        export: 'export',
        import: 'import'
      }
      this.oldGroupData = cloneDeep(this.selectedGroup)
      //   console.log('index...', index, this.selectedGroup)
      if (index === condition.rename) {
        this.$nextTick(() => {
          this.$set(this.selectedGroup, 'isEdit', true)
          this.temp_tgName = this.selectedGroup.tg_name
        })
      } else if (index === condition.delete) {
        this.deleteGroup(this.selectedGroup)
      } else if (index === condition.add) {
        this.addGroup(this.selectedGroup)
      } else if (index === condition.export) {
        this.exportExcel()
      } else if (index === condition.import) {
        this.showFileImport = true
      }
    },
    addGroup(group) {
      if (!group.is_flag) {
        this.editGroup = cloneDeep(group)
        this.editGroup.id = 0
      }
      this.isShowAddGroup = true
    },
    deleteGroup(row) {
      const { id, tg_num, p_tg_num } = row
      if (row.is_flag) {
        this.$message.error('不可删除顶级分组')
      } else {
        this.openMessage(() => {
          groupDelete({ id, tg_num }).then(res => {
            if (res && res.code > 0) {
              const success = this.$t('common.delete_success')
              this.$message.success(success)
            } else {
              this.$message.error(res.msg)
            }
            this.refeshGroup({ tg_num: p_tg_num })
          }).catch(err => {
            this.$message.error(err)
          })
        }, {
          message: this.$t('mainPage.checkDelete'),
          title: this.$t('mainPage.tip'),
          confirmButtonText: this.$t('mainPage.confirmBtn'),
          cancelButtonText: this.$t('mainPage.cancelBtn'),
          cancelText: this.$t('mainPage.cancelTipMessage')
        })
      }
    },
    closeGroupManagePop(e) {
      this.isShowGroupManage = e
    },
    refeshGroup(parent = {}) {
      //   console.log('parent...', parent)
      // this.getDevicesGroups()
      const { tg_num } = parent

      if (tg_num === this.userInfo.tg_num || !tg_num) {
        this.rootNode.childNodes = []
        this.loadGroupList(this.rootNode, this.groupResolve)
      } else {
        this.updateTreeChildren('my-tree', tg_num)
        this.selectDeviceGroup(this.curTgNum)
      }
    },
    async updateTreeChildren(key, tg_num) {
      const data = await this.getGroupforNode(tg_num) || []
      this.$refs[key].updateKeyChildren(tg_num, data)
    },
    initConfig() {
      this.popW = POP_SIZE.large.width
      this.popH = POP_SIZE.large.height
      this.popAddTgW = POP_SIZE.small.width
      this.popAddTgH = POP_SIZE.small.height
      this.defaultExpandedKeys = []
    },
    exportExcel() { // 导出组列表
      window.open(process.env.VUE_APP_BASE_API + `/v2/admin/terminal/export?type=1&userid=${this.userInfo.userid}`)
    },
    showGroupManage() {
      this.isShowGroupManage = true
    },
    showSearchBar() {
      this.$emit('showSearchBar')
    },
    linkHandler(path) {
      //   console.log('path...', path)
      if (path) {
        const arr = path?.split('/') || []
        if (arr.length) {
          this.activeTab = 'menus'
          this.activeMenu2 = arr[arr.length - 1]
        }
      }
    },
    getDevicesGroups() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('business/getGroupList').then(res => {
          if (res && res.length) {
            // this.groupList = [].concat(res)
            this.menuArr = JSON.parse(JSON.stringify(this.groupList))
            this.menuArr.unshift({ tg_name: this.$t('mainPage.viewAllequipmentGroup'), tg_num: '', is_flag: 1, isLeaf: true })
            this.menuArr = this.menuArr.filter(item => item.tg_num || item.is_flag) || []
            resolve(this.menuArr)
            //   console.log('menuArr...', this.menuArr)
          }
        })
      })
    },
    openMenuSub(e) {
      this.parentPath = e
    },
    // ///////////////////////////

    foo() {
      // 取消鼠标监听事件 菜单栏
      this.menuVisible = false
      document.removeEventListener('click', this.foo) // 关掉监听，
    },
    styleMenu(menu, event) {
      menu.style.position = 'fixed'
      menu.style.left = event.clientX + 'px'
      menu.style.top = event.clientY + 'px'
      document.addEventListener('click', this.foo) // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
    },
    rightClick(row, column, event) {
      //   console.log(event)
      if (row.is_flag === 1) return
      if (!isEmpty(this.selectedGroup) && this.selectedGroup?.isEdit) {
        this.$set(this.selectedGroup, 'isEdit', false)
      }
      if (row.tg_num) {
        this.pid = column.id
        this.testModeCode = row.testModeCode
        this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
        this.menuVisible = true // 显示模态窗口，跳出自定义菜单栏
        // event.preventDefault() //关闭浏览器右键默认事件
        // this.CurrentRow = row
        const groupRightMenu = this.$refs.groupRightMenu
        this.selectedGroup = row
        this.styleMenu(groupRightMenu, event)
      }
    },
    // ////////////////////////////
    // openContextMenu() {
    //   console.log('open')
    // },
    rowContextmenu(event, data, node, el) {
      //   console.log(event)
      //   console.log(data)
      //   console.log(node)
      event.preventDefault()
      this.openMenu(event, data)
    },
    openMenu(e, data) {
      this.menuOffset.offsetLeft = 313 // container margin left
      this.menuOffset.offsetWidth = 300 // container width
      this.menuOffset.clientX = e.clientX
      this.menuOffset.clientY = e.clientY
      // this.currentData = data
    },
    clickCtxMenu(e) {
      //   console.log('选择设备组菜单', e)
      // if (!e || !e.tg_num) return
      this.selectMenu(e) // 调用之前的el-menu选择菜单方法
      // index && this[`do${index}`] && this[`do${index}`]()
      // const obj = inArray(this.contextMenus, 'index', index)
      // // 设置弹窗标题
      // if (obj) this.popTitle = obj?.label || ''
    },
    checkAll() {
      const data = {
        page: 1,
        limit: 10
      }

      this.debounce(() => {
        this.$store.dispatch('business/getDevicesAction', data).then(() => {
          this.activeMenu = '#' + Math.random()
          this.$store.commit('business/SET_TG_NUM', '')
        }).catch(err => {
          this.$message.error(err)
        })
      }, 200)
    },
    getDevices(params) {
      // 调接口
      this.$store.dispatch('business/getDevicesAction', params)
    },
    openSub(index) {
      this.clickMenuForSearch(index)
      this.$store.commit('business/SET_TG_NUM', index)
      this.activeMenu = '#' + Math.random()
    },
    selectMenu(e) {
      const { tg_num, tg_name } = e
      let tgName = tg_name
      if (tg_num === this.userInfo.tg_num || !tg_num) {
        tgName = ''
      }
      //   console.log('选择菜单回调', tg_num)
      this.$store.commit('business/SET_TG_NUM', tg_num)
      this.$store.commit('business/SET_TG_NAME', tgName)
      this.clickMenuForSearch(e)
    },

    selectMoreMenu(index) {
      this.sonPath = index
      const path = this.parentPath + this.sonPath
      if (!path) return
      this.$router.push(path)
    },
    openCommonMenu(index) {
      //   console.log('选择菜单回调', index)
      this.closeDrawer()
    },
    closeDrawer() {
      //   console.log('关闭遮罩')
      this.drawer = false
      this.activeCommonMenu = ''
    },
    clickMenuForSearch(item) {
      const { tg_num } = item
      const data = {
        page: 1,
        limit: 10,
        tg_num: tg_num
      }
      this.debounce(() => {
        this.$store.dispatch('business/getDevicesAction', data).then(() => {
        })
      }, 200)
    },
    changeFixed() {
      this.isFixed = !this.isFixed
    },
    changeEnlarge() {
      this.isShowMost = !this.isShowMost
    }
  }
  }
</script>

<style lang="scss" scoped>

</style>
