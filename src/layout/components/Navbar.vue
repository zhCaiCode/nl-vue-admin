<template>
  <div class="navbar">
    <div class="right-menu">
      <template v-if="device!=='mobile'">
      </template>

      <el-dropdown v-if="token" class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div v-else class="right-menu-item hover-effect not-login">
        <i class="home-icon icon" style="font-size: 40px;cursor: pointer;vertical-align: middle;margin-right:12px">
          <svg t="1715586381984" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="4752" width="32" height="32">
            <path
              d="M512 1024C229.205 1024 0 794.795 0 512S229.205 0 512 0s512 229.205 512 512-229.205 512-512 512z m0-496.47a170.667 170.667 0 1 0 0-341.333 170.667 170.667 0 0 0 0 341.334z m263.765 263.723a263.765 263.765 0 1 0-527.53 0h527.53z"
              p-id="4753" fill="#e6e6e6"></path>
          </svg>
        </i>
        <el-link href="/login" :underline="false">未登录</el-link>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapGetters,mapState } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import TopNav from '@/components/TopNav'
  import Hamburger from '@/components/Hamburger'
  import Screenfull from '@/components/Screenfull'
  import SizeSelect from '@/components/SizeSelect'
  import Search from '@/components/HeaderSearch'
  import RuoYiGit from '@/components/RuoYi/Git'
  import RuoYiDoc from '@/components/RuoYi/Doc'
  import { getToken } from '@/utils/auth'

  export default {
    components: {
      Breadcrumb,
      TopNav,
      Hamburger,
      Screenfull,
      SizeSelect,
      Search,
      RuoYiGit,
      RuoYiDoc
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'device'
      ]),
      setting: {
        get() {
          return this.$store.state.settings.showSettings
        },
        set(val) {
          this.$store.dispatch('settings/changeSetting', {
            key: 'showSettings',
            value: val
          })
        }
      },
      topNav: {
        get() {
          return this.$store.state.settings.topNav
        }
      },
      token() {
        return getToken()
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        this.$confirm('确定注销并退出系统吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('LogOut').then(() => {
            location.href = '/weblib'
          })
        }).catch(() => {
        })
      },
      gotoHome() {
        this.$router.replace({ name: 'home' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    /* height: 50px; */
    overflow: hidden;
    position: relative;
    background: #fff;
    padding-right: 30px;
    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .topmenu-container {
      position: absolute;
      left: 50px;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0;
        height: 100%;
        font-size: 16px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }

        ::v-deep {
          .el-link.el-link--default {
            color: #fff;
            font-size: 16px;

            &:hover {
              color: #409EFF;
            }
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }

  }

</style>
