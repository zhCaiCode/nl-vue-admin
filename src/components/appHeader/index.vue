<template>
  <el-header class="app-header" style="height: 7.5rem">
    <el-row style="height: 100%">
      <el-col :span="16">
        <div class="sys-name" @click="goToHome">
          <img :class="logoClassName" src="../../assets/images/logo.png" alt="">
          <span :class="sysNameText">B/S架构SaaS类软件产品前端设计框架及组件库</span>
        </div>
      </el-col>

      <el-col :span="8">
        <Navbar />
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
  import Navbar from '@/layout/components/Navbar'
  import { LOGO_CLASS_NAME, SYS_NAME_TEXT } from '../../config'

  export default {
    name: 'AppHeader',
    components: { Navbar },
    computed: {
      sysNameText() {
        return SYS_NAME_TEXT
      },
      logoClassName() {
        return LOGO_CLASS_NAME
      }
    },
    methods: {
      goToHome(e) {
        if (![this.sysNameText, this.logoClassName].includes(e.target.getAttribute('class'))) return
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-header {
    position: relative;
  }

  ::v-deep .el-header {
    padding: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 19;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .25);


  }

  .el-header {
    background: $bg-color-primary;

    ::v-deep .navbar {
      background-color: inherit;
      top: 50%;
      transform: translateY(-50%);

      .right-menu {
        display: flex;
        align-items: center;
        justify-content: center;

        .right-menu-item {
          display: flex !important;
          justify-content: center;
          align-items: center;

          i {
            color: #fff;
            font-weight: 400;
          }

          i:hover {
            svg path {
              fill: #409eff;
            }
          }
        }

        .right-menu-item.not-login:hover {
          i {
            svg path {
              fill: #409eff;
            }

          }

          .el-link--inner {
            color: #409eff;
          }

        }

        .right-menu-item.not-login {
          i {
            display: inline-block;
            position: relative;
            width: 32px;
            height: 32px;

            svg {
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              margin: auto;

            }
          }
        }

      }
    }

    .el-row {
      .el-col {
        height: 100%;

        img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .search-logo {
          width: 45px;
        }

        .sys-name {
          display: flex;
          /*justify-content: center;*/
          align-items: center;
          height: 100%;
          width: 100%;
          padding-left: 16px;

          .sys-name--text {
            position: relative;
            left: 16px;
            text-align: center;
            font-size: 28px;
            color: #fff;
            font-weight: 700;
            font-family: Poppins-Regular;
          }
        }

        .sys-name--text:hover, .search-logo:hover {
          cursor: pointer;
        }
      }
    }
  }

  ::v-deep .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;

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
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &:not(:first-child) {
          &::before {
            position: relative;
            /*left: 0;*/
            /*top: 0;*/
            /*bottom: 0;*/
            margin: auto 30px;
            height: 15px;
            width: 1px;
            content: '';
            background: rgba(255, 255, 255, .2);
          }
        }

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
          margin-top: 12px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 28px;
            height: 28px;
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
