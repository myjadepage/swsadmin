<template>
  <div class="bg_main">
    <div class="row">

      <Logo/>

      <div class="col col-3 text-center">
        <LoginForm @signInClick="showSignIn=true" />
        <SignInForm @cencelClick="showSignIn=false" v-if="showSignIn"/>
      </div>

   </div>
</div>
</template>

<script>
import Logo from  "@/components/main/Logo"
import LoginForm from  "@/components/main/LoginForm"
import SignInForm from  "@/components/main/SignInForm"

export default {
  components:{
    Logo,LoginForm,SignInForm
  },
  data(){
    return{
      showSignIn:false
    }
  }
}
</script>

<style>

</style>