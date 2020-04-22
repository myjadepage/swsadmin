<template>
  <div class="signIn bg-light">
      <header>
          담당자 정보
      </header>
      <form @keypress.enter.prevent @submit.prevent="signupBtnClick" class="text-left form-group">
          <input v-model="mobile" type="tel" name="phone" id="phone" placeholder="휴대폰 번호를 입력 해주세요." required> <br>
          <input v-model="name" type="text" name="name" placeholder="담당자 이름을 입력 해주세요." required>   <br>
          <input v-model="email" type="email" name="email" id="email" placeholder="담당자 이메일을 입력 해주세요." required> <br>
          <br>
          <div class="row">
            <div class="col col-6">
           <input v-model="pw" type="password" name="password" id="" placeholder="패스워드를 입력 해주세요." required>
            </div>
            <div class="col col-6">
           <input v-model="pwCheck" type="password" placeholder="패스워드 확인을 입력 해주세요." required>
            </div>
          </div>
          <!-- <select name="auth" id="auth">
            <option value="">권한 설정을 선택 해주세요</option>
          </select> -->
          <br>

        <footer class="text-center">
            <div class="row">
                <div class="col col-6">
                 <button @click="cancelClick" class="btn btn-sky">취소</button>
                </div>
                <div class="col col-6">
                  <button type="submit" class="btn btn-primary">확인</button>
                </div>
            </div>
        </footer>
      </form>
    </div>
</template>

<script>
import commonJs from "@/assets/js/common.js"

export default {
   mixins: [commonJs],
   data(){
     return{
       mobile:'',
       name:'',
       email:'',
       pw:'',
       pwCheck:''
     }
   },
   computed:{
    isPasswordValid(){
          return this.pw === this.pwCheck
        }
   },
    methods:{
        cancelClick(){
            this.$emit('cencelClick')
        },

        signupBtnClick(){
          if(this.isPasswordValid){
            let item = {jsonData:{
              email:this.email,
              password:this.makeRsa(this.pw),
              name:this.name,
              mobile:this.makeRsa(this.mobile)  
            }
          }

          console.log(item);
          
            // this.axiosPostRequest('api/v1/auth/admins/join',item,(res)=>{
            //   console.log(res);
            //   if (res.data.jsonData.resultCode==='0001') {
            //     this.$emit('cencelClick')
            //   }
            //   },
            //   (err)=>{
            //     console.log(err);
            //   })
          }else{
           alert('비밀번호를 확인 해주십시오')
          }
        }
    }
}
</script>

<style>

</style>