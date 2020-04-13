<template>
    <form class="form-group" @submit.prevent="loginClick" method="POST">
      <input class="form-control" type="email" name="email" id="email" placeholder="Email" required>
      <br>
      <input class="form-control" type="password" name="password" id="password" placeholder="Password" required>

        <div>
          <input type="checkbox" name="autoLogin" id="autoLogin"><label class="ml-2 mr-5 text-light" for="autoLogin">자동로그인</label>
          <input type="checkbox" name="idSave" id="idSave"><label class="ml-2 text-light" for="idSave">ID저장</label>
        </div>
    
      <button class="btn btn-login" type="submit">LOGIN</button>

      <div class="text-light mt-2">
        <span @click="signInClick" class="text-light btn">회원가입</span> / <span class="text-light btn">비밀번호 문의</span>
      </div>
    </form>
</template>

<script>
import commonJs from "@/assets/js/common.js"

export default {
    mixins: [commonJs],
    data(){
      return{

      }
    },
    methods:{
        signInClick(){
            this.$emit('signInClick')
        },
        
        loginClick(x){
          this.axiosPostRequest('api/v1/auth/admins/login',
          {jsonData:{email:x.target.elements[0].value,password:this.makeRsa(x.target.elements[1].value)}},
          (res)=>{
            sessionStorage.setItem('accessToken',res.data.jsonData.accessToken)
            sessionStorage.setItem('refreshToken',res.data.jsonData.refreshToken)
            this.$store.commit('changeLogStatus')
            this.$router.push('/dashboard')
          },
          (err)=>{
            console.log(err);
          })
          
        }

    }
}
</script>

<style>

</style>