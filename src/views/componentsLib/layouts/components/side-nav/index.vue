<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.title" v-html="showItem(item)">

      </li>
    </ul>
  </div>
</template>

<script>
  import menus from './menu.json'
  export default {
    name:'SideNav',
    compouted:{
      list(){
        return menus.data
      }
    },
    methods:{
      showItem(item){
        return (
          `<a>${item.title}</a>`
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
.side-nav .nav-item a {
    font-size: 16px;
    color: #333;
    line-height: 40px;
    height: 40px;
    margin: 0;
    padding: 0;
    text-decoration: none;
    display: block;
    position: relative;
    transition: .15s ease-out;
    font-weight: 700;
}
.side-nav .nav-item .nav-item a {
    display: block;
    height: 40px;
    color: #444;
    line-height: 40px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 400;
}
</style>
