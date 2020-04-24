<template>
  <div class="memberListWrap">
      <table class="table table-hover">
          <thead>
              <tr>
                  <th><input type="checkbox" @change="checkAll" ref="checkAll" :checked="checkAllFlag"></th>
                  <th>No</th>
                  <th>아이디</th>
                  <th>이름</th>
                  <th>회원등급</th>
                  <th>성별</th>
                  <th>나이</th>
                  <th>구매이력</th>
                  <th>선택</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(member,idx) in members.slice((this.currentPage-1) * this.perPage,((this.currentPage-1) * this.perPage) + this.perPage)" :key="idx">
                  <td><input @change="checkMember" v-model="member.isChecked" type="checkbox" class="memberCheck"></td>
                  <td>{{calcNo(idx)}}</td>
                  <td>{{member.id}}</td>
                  <td>{{member.name}}</td>
                  <td>{{member.gradeSysId===0?'일반회원':'코알라회원'}}</td>
                  <td>{{member.gender==='M'?'남':'여'}}</td>
                  <td>{{member.age}}</td>
                  <td>{{member.didBuy?"있음":'없음'}}</td>
                  <td><button class="btn btn-light">확인</button></td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
export default {
    props:['members','currentPage','perPage','checkAllFlag'],
    methods:{
        calcNo(idx){
            let val = idx + 1
            
            val += (this.currentPage-1) * this.perPage
            return val
        },
        checkAll(e){
            if(e.target.checked){
                this.$el.getElementsByClassName('memberCheck').forEach((c,idx)=>{
                    this.members[idx].isChecked = true
                    this.$emit('checkAll', true)
                })
            }else{
                this.$el.getElementsByClassName('memberCheck').forEach((c,idx)=>{
                    this.members[idx].isChecked = false
                    this.$emit('checkAll', false)
                })
            }
        },
        checkMember(){
            let isCheckAll = true
                this.$el.getElementsByClassName('memberCheck').forEach(c=>{
                    if(c.checked===false){
                        isCheckAll = false
                    }
                })
                
                this.$refs.checkAll.checked = isCheckAll
        },

        // selectMember(id, name){
        //     this.$emit('select',{id:id,name:name})
        // }
    }
}
</script>

<style>

</style>