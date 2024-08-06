<template>
  <div class="page-qrcode">
    <div ref="qrCodeUrl" class="qrcode" />
  </div>
</template>

<script>
// import qrcode from 'qrcodejs2'
import { QRErrorCorrectLevel } from './utils/qrcode'
import QRCode from './utils/index'
export default {
  name: 'QrCodePanel',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.creatQrCode()
  },
  methods: {
    creatQrCode() {
      const text = this.value
      const options = {
        render: 'canvas',
        text,
        width: 150,
        height: 150,
        typeNumber: -1,
        correctLevel: QRErrorCorrectLevel.H,
        background: '#ffffff',
        foreground: '#000000'
      }
      var qrcode = new QRCode(this.$refs.qrCodeUrl, options)
      //   console.log(qrcode)
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-qrcode{
    height:calc(100% - 40px);
    overflow: auto;
    .qrcode{
      width: 100%;
      /*min-height: 350px;*/
      padding: 20px;
      overflow: auto;
      text-align: center;
      position:relative;
      height:100%;
      ::v-deep{
        img {
          display: inline-block!important;
          width: 250px;
          height: 250px;
          background-color: #fff; //设置白色背景色
          padding: 6px; // 利用padding的特性，挤出白边
          box-sizing: border-box;
          position: relative;
        }
        @media screen and (max-width:1280px){
          img{
            width: 200px;
            height: 200px;
          }
        }
      }
    }
  }

</style>
