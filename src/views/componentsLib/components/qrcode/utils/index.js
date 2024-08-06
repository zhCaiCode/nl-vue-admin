import QrcodeUtil, { QRErrorCorrectLevel } from './qrcode'

export default class Qrcode {
  constructor(el, options) {
    if (typeof el == 'string') {
      el = document.getElementById(el)
    }
    this._el = el
    if (typeof options === 'string') {
      this.options = { text: options }
    }
    this.options = Object.assign(
      {},
      {
        render: 'canvas',
        text: '',
        width: 256,
        height: 256,
        typeNumber: -1,
        correctLevel: QRErrorCorrectLevel.H,
        background: '#ffffff',
        foreground: '#000000'
      },
      options)
    var element	= this.options.render == 'canvas' ? this.createCanvas() : this.createTable()
    this._el.appendChild(element)
  }
  createCanvas=() => {
    const qrcode = new QrcodeUtil(this.options?.typeNumber, this.options.correctLevel)
    qrcode.addData(this.options.text)
    qrcode.make()
    // create canvas element
    const canvas	= document.createElement('canvas')
    canvas.width	= this.options.width
    canvas.height	= this.options.height
    const ctx		= canvas.getContext('2d')
    // compute tileW/tileH based on options.width/options.height
    const tileW	= this.options.width / qrcode.getModuleCount()
    const tileH	= this.options.height / qrcode.getModuleCount()
    // draw in the canvas
    for (let row = 0; row < qrcode.getModuleCount(); row++) {
      for (let col = 0; col < qrcode.getModuleCount(); col++) {
        ctx.fillStyle = qrcode.isDark(row, col) ? this.options.foreground : this.options.background
        const w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW))
        const h = (Math.ceil((row + 1) * tileH) - Math.floor(row * tileH))
        ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h)
      }
    }
    // return just built canvas
    return canvas
  }
  createTable=() => {
    const qrcode = new QrcodeUtil(this.options.typeNumber, this.options.correctLevel)
    qrcode.addData(this.options.text)
    qrcode.make()
    const aHTML = [`<table style="border:0;border-collapse:collapse;width:${this.options.width}px;height:${this.options.height}px;background-color:${this.options.background}">`]
    var tileW	= this.options.width / qrcode.getModuleCount()
    var tileH	= this.options.height / qrcode.getModuleCount()
    for (var row = 0; row < qrcode.getModuleCount(); row++) {
      aHTML.push(`<tr style="height:${tileH}px;">`)

      for (var col = 0; col < qrcode.getModuleCount(); col++) {
        aHTML.push(`<td style="width:${tileW}px;background-color:${qrcode.isDark(row, col) ? this.options.foreground : this.options.background};"></td>`)
      }
    }
    aHTML.push('</table>')
    return aHTML.join('')
  }
}
