<template>
  <div class="container-login">

    <div class="login-box">
      <div class="right">
              <login />
      </div>
    </div>
  </div>

</template>
<script>
  import Login from './login'
  export default {
    components: { Login }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .container-login{
    position: relative;
    height: 100%;
    background-image: url("~@/assets/images/bg_login.png");
    background-size: cover;
    background-repeat: no-repeat;

    .login-box{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 77%;
      height: 798px;
      margin:auto;
      background-image: url("~@/assets/images/bg_login_form.png");
      background-size: cover;
      background-repeat: no-repeat;
    }
    .right{
      background-color: #fff;
      float: right;
      width: 45%;
      height: 100%;
      border-radius: 0 30px 30px 0;
    }
  }

</style>

