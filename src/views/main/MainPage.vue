<template>
  <div class="bg_main">
    <div class="row">

      <Logo/>

      <div class="col col-3 text-center">
        <LoginForm @signInClick="showSignIn=true" />
        <SignUpForm @cencelClick="showSignIn=false" v-if="showSignIn"/>
      </div>

   </div>
</div>
</template>

<script>
import Logo from  "@/components/main/Logo"
import LoginForm from  "@/components/main/LoginForm"
import SignUpForm from  "@/components/main/SignUpForm"


export default {
  created(){
    this.$store.dispatch('logout')
  },
  components:{
    Logo,LoginForm,SignUpForm
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