<template>
  <div :style="{ minHeight: boxH, minWidth: boxW, ...styles }">
    <el-card class="statistic-box">
      <div v-if="$slots.header" slot="header" class="clearfix">
        <slot />
      </div>
      <div v-else slot="header" class="clearfix" style="height:30px">
        <span style="display:inline-block;font-weight:700;line-height:30px">{{ title }}</span>
        <div v-if="$slots.optBtn" style="display:inline-block;float:right">
          <slot name="optBtn" />
        </div>
        <el-button v-show="showCloseButton" style="float: right; padding: 3px 0" type="text"
          @click="handleClose">close</el-button>
        <div v-show="showMoreButton || values.length > length"
          style="float: right; padding: 3px 0;line-height:30px;cursor: pointer;" type="text" @click="handleViewMore">
          <el-tooltip class="item" effect="dark" content="more" placement="top">
            <i class="iconfont icon-file_more" style="font-size:24px" />
          </el-tooltip>
        </div>
      </div>
      <div class="text-center" style="height:100%;">
        <div v-if="data && data.length" :style="'width:100%;' + content_style">
          <div class="left" :style="{width:extra ? 'auto':'100%'}">
            <div class="content-wrapper">
              <div v-for="(val, idx) in data" :key="idx" class="content" :style="item_style">
                <div v-if="idx < length" class="content__body">
                  <p class="content__wrapper number">
                    {{ val.value }}
                  </p>
                  <p class="content__wrapper title">
                    <el-tag v-if="val.status" :type="val.status || 'default'">
                      {{ val.title }}
                    </el-tag>
                    <span v-else>
                      {{ val.title }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="extra" class="extra__wrapper" style="float:right">
            <div v-for="(ex) in extra" :key="ex.title">
              <p :class="extraClass[ex.className]">
                <span>
                  {{ ex.title }}
                </span>
                <span style="padding-left:5px">
                  {{ ex.value }}
                  <i :class="iconArr[ex.key]" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <span v-else class="no-data-tip" style="position: relative;top:50%;">No Data</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { COLOR } from './config'
export default {
  name: 'StatisticPanel',
  props: {
    styles: {
      type: Object,
      default: () => { }
    },
    title: {
      type: String,
      default: ''
    },
    showCloseButton: {
      type: Boolean,
      default: false
    },
    showMoreButton: {
      type: Boolean,
      default: false
    },
    height: {
      type: [Number, String],
      default: 150
    },
    width: {
      type: [Number, String],
      default: 300
    },
    type: {
      type: String,
      default: 'default'
    },
    values: {
      type: Array,
      default: () => []
    },
    colors: {
      type: Array,
      default: () => [COLOR.green, COLOR.oringe, COLOR.pink, COLOR.blue, COLOR.purple]
    },
    extra: {
      type: [Array, Boolean],
      default: false
    },
    iconArr: {
      type: Object,
      default: () => {
        return {
          add: 'iconfont icon-arrow-up',
          online: 'iconfont icon-thunder',
          offline: 'iconfont icon-lixian'
        }
      }
    },
    extraClass: {
      type: Object,
      default: () => {
        return {
          green: 'extra__wrapper__body green',
          blue: 'extra__wrapper__body blue',
          default: 'extra__wrapper__body default'
        }
      }
    },
    length: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      boxH: '',
      boxW: '',
      orgColor: ['green', 'oringe', 'pink', '#1890FF', 'purple'],
      colorArray: [],
      data: [],
      content_style: 'display:flex;align-items:center;justify-content: space-around;',
      item_style: ''
    }
  },
  watch: {
    colors: {
      deep: true,
      immediate: true,
      handler(val) {
        this.colorArray = val
        if (this.colorArray.length < 5) {
          for (let i = this.colorArray.length; i < 5; i++) {
            this.colorArray.push(this.orgColor[i])
          }
        }
      }
    }
  },
  created() {
    this.boxH = typeof this.height === 'number' ? this.height + 'px' : this.height
    this.boxW = typeof this.width === 'number' ? this.width + 'px' : this.width
    this.values.forEach(val => {
      if (this.data.length < this.length) {
        this.data.push(val)
      }
    })
    if (this.extra) {
      // this.content_style = 'display:flex;'
      this.item_style = 'float:left'
    }
  },
  methods: {
    handleClose() {
      this.$emit('close', false)
    },
    handleViewMore() {
      this.$emit('handleViewMore', { title: this.title, values: this.values, type: this.type, extra: this.extra })
    }
  }
}
</script>

<style lang="scss" scoped>
.statistic-box {
  width: 100%;
  height: 100%;
}

::v-deep.el-card .el-card__body {
  width: 100%;
  height: calc(100% - 56px);
}

::v-deep .el-card__header {
  padding: 10px 10px 10px 20px;
  color: #333;
}

.left {
  float: left;
}

.content-wrapper {
  display: flex;
}

.content {
  &:not(:first-child) {
    margin-left: 25px;
  }

  &:first-child {
    margin-left: 10px;
  }

  .content__wrapper {
    margin: 0;
  }

  .number.content__wrapper {
    color: #1890ff;
    font-size: 32px;
    font-weight: 700;
  }
}

::v-deep .el-card__body {
  padding: 10px
}

.extra__wrapper {
  padding-left: 10px;

  p {
    text-align: left;
  }
}

.extra__wrapper__body {
  font-size: 14px;
  font-weight: 700;

  &:last-child {
    margin-bottom: 0;
  }

  &.green {
    color: green;
  }

  &.blue {
    color: #1890ff;
  }

  &.default {
    color: #bfbfbf;
  }
}

.icon-lixian::before {
  padding-left: 3px;
}
</style>
