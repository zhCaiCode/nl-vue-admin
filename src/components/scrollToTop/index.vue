<template>
  <div class="comp-to-top" id="top-btn">
    <div class="triangle"></div>
  </div>
</template>

<script>
  export default {
    name: 'ScrollToTop',
    props: {
      element: {
        type: [HTMLDivElement, Object],
        default: null
      },
      selector: {
        type: String,
        default: ''
      }
    },
    mounted() {
      document.getElementById('top-btn').addEventListener('click', () => {
        this.scrollAction()
      })
    },
    computed: {
      selectorElement() {
        let dom = document.querySelectorAll(this.selector) || []
        let res = null
        try {
          if (dom.length) {
            if (dom.length > 1) {
              throw  new Error('Error:selector must be unique')
            } else {
              res = dom[0]
            }
          } else {
            res = null
          }
        } catch (e) {
          console.log(e)
        }
        return res || null
      }
    },
    methods: {
      scrollTop(el) {
        if( el.scrollTo ){
          el.scrollTo({ top: 0, behavior: 'smooth' })
        }else{
          el.scrollTop = 0
        }
      },
      scrollAction() {
        if (this.element != null) {
          if (this.element instanceof HTMLDivElement) {
            this.element.scrollTop = 0
          } else if (this.element instanceof Object) {
            this.element.$el.scrollTop = 0
          } else {
            throw  new Error('element type Error')
          }
        } else {
          if (this.selector) {
            if (this.selectorElement && this.selectorElement instanceof HTMLDivElement) {
              this.scrollTop(this.selectorElement)
            } else {
              throw  new Error('element type is not HTMLDivElement or VueComponent')
            }
          } else {
            throw new Error('missing selector  or ref element')
          }

        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comp-to-top {
    position: fixed;
    bottom: 12%;
    right: 20px;
    width: 30px;
    height: 30px;
    border: 1px solid #c2c2c2;
    background-color: #fff;
    cursor: pointer;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, .2);
    border-radius: 50%;
    overflow: hidden;

    .triangle {
      position: relative;
      top: 50%;
      left: 50%;
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border-width: 8px;
      border-style: solid;
      transform: translateX(-50%) translateY(-90%);
      border-color: transparent transparent rgba(0, 0, 0, .17) transparent;
    }
  }
</style>
