<template>
  <div class="signIn bg-light">
      <header>
          담당자 정보
      </header>
      <form action="" class="text-left form-group">
          <input  type="tel" name="phone" id="phone" placeholder="휴대폰 번호를 입력 해주세요." required> <br>
          <input  type="text" name="name" placeholder="담당자 이름을 입력 해주세요." required>   <br>
          <input  type="email" name="email" id="email" placeholder="담당자 이메일을 입력 해주세요." required> <br>
          <br>
          <input type="password" name="password" id="" placeholder="패스워드를 입력 해주세요." required>
          <input type="password" placeholder="패스워드 확인을 입력 해주세요." required>
          <select name="auth" id="auth" required>
            <option value="">권한 설정을 선택 해주세요</option>
          </select>
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
export default {
    methods:{
        cancelClick(){
            this.$emit('cencelClick')
        }
    }
}
</script>

<style>

</style>