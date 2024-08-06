
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
    des:'用于兼容扫码设备二维码算法的二维码生成组件',
    meta:{
      component:'Qrcode',
      des:'用于兼容扫码设备二维码算法的二维码生成组件',
      template:`
        <template>
           <qr-code v-for="item in QrCodeValue" :key="item.id" :value.sync="item.value" />
        </template>
        export default{
          data(){

            qrCodeValue:[]
          },
          methods:{
                getQrcode() {
                 function hexCharCodeToStr(hexCharCodeStr) {
                    var trimedStr = hexCharCodeStr.trim()
                    var rawStr = trimedStr.substr(0, 2).toLowerCase() === '0x' ? trimedStr.substr(2) : trimedStr
                    var len = rawStr.length
                    if (len % 2 !== 0) {
                      //   console.log('Illegal character exists!')
                      return ''
                    }
                    var curCharCode
                    var resultStr = []
                    for (var i = 0; i < len; i = i + 2) {
                      curCharCode = parseInt(rawStr.substr(i, 2), 16)
                      resultStr.push(String.fromCharCode(curCharCode))
                    }
                    return resultStr.join('')
                  }
                  getQrCode(params).then(res => {
                    if (res && res?.code > 0) {
                      this.QrCodeValue = res?.data || []
                      this.QrCodeValue.map(item => {
                        item.value = hexCharCodeToStr(item.value)
                        return item
                      })
                      this.showQrcode = true
                    }
                  })
              },
          }
        }
      `
    }
  }
]

export const attrData = [
  {
    params:'value',
    des:'二维码内容',
    type:'string',
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
