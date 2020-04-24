<template>
  <div class="searchTableWrap">
      <table class="table">
          <tr>
              <th>그룹별</th>
              <td>
                  <select name="age" class="mr-2 form-control float-left" :style="{width:'120px'}"  @change="changeGroupType">
                      <option value="">연령대</option>
                      <option value="under20">20세 미만</option>
                      <option value="ages20">20세 ~ 29세</option>
                      <option value="ages30">30세 ~ 39세</option>
                      <option value="ages40">40세 ~ 49세</option>
                      <option value="ages50">50세 ~ 59세</option>
                      <option value="over60">60세 이상</option>
                  </select>
                  <select name="gender" class="mr-2 form-control float-left" :style="{width:'80px'}" @change="changeGroupType">
                      <option value="">성별</option>
                      <option value="M">남자</option>
                      <option value="F">여자</option>
                  </select>
                  <select name="grade" class="mr-2 form-control" :style="{width:'120px'}" @change="changeGroupType">
                      <option value="">회원등급</option>
                      <option value="0">일반회원</option>
                      <option value="1">코알라회원</option>
                  </select>
              </td>
          </tr>
          <tr>
              <th>구매이력</th>
              <td>
                  <div class="row">
                      <div class="col col-2">
                        <select :style="{width:'80px'}" class="form-control" v-model="didBuy">
                            <option value="all">전체</option>
                            <option value="0">없음</option>
                            <option value="1">있음</option>
                         </select>
                      </div>
                      <div class="col col-10">
                         <label>금액</label><input :disabled="didBuy!=1" class="ml-3 mr-2 form-control" type="number" :style="{width:'100px', display:'inline-block'}"><label class="mr-2">원</label>
                         ~ <input :disabled="didBuy!=1" class="ml-2 mr-2 form-control" type="number" :style="{width:'100px', display:'inline-block'}"><label for="">원</label><br>
                      </div>
                  </div>
                    <div class="row mt-2">
                        <div class="col col-2"></div>
                        <div class="col col-10">
                            <label class="float-left">기간</label>
                            <div class="float-left">
                                <div class="row">
                                    <b-input-group class="col">
                                        <b-form-input :disabled="didBuy!=1" class="ml-3"  size="sm" v-model="dateInfo.startDate" type="text" placeholder="시작일자 (YYYY-MM-DD)"></b-form-input>
                                        <b-input-group-append>
                                            <b-form-datepicker :disabled="didBuy!=1" button-variant="outline-secondary" size="sm" v-model="dateInfo.startDate" button-only right></b-form-datepicker>
                                        </b-input-group-append>
                                    </b-input-group>
                                    ~
                                    <b-input-group class="col">
                                        <b-form-input :disabled="didBuy!=1" size="sm" v-model="dateInfo.endDate" type="text" placeholder="종료일자 (YYYY-MM-DD)"></b-form-input>
                                        <b-input-group-append>
                                            <b-form-datepicker :disabled="didBuy!=1" button-variant="outline-secondary" size="sm" v-model="dateInfo.endDate" button-only right></b-form-datepicker>
                                        </b-input-group-append>
                                    </b-input-group>
                                </div>
                                <div class="date-btns mt-2">
                                    <b-button :disabled="didBuy!=1" variant="outline-secondary" @click="selectedDate('today')" size="sm" class="ml-3">오늘</b-button>&emsp;
                                    <b-button :disabled="didBuy!=1" variant="outline-secondary" @click="selectedDate('yester')" size="sm">어제</b-button>&emsp;
                                    <b-button :disabled="didBuy!=1" variant="outline-secondary" @click="selectedDate('3date')" size="sm">3일간</b-button>&emsp;
                                    <b-button :disabled="didBuy!=1" variant="outline-secondary" @click="selectedDate('7date')" size="sm">7일간</b-button>&emsp;
                                    <b-button :disabled="didBuy!=1" variant="outline-secondary" @click="selectedDate('10date')" size="sm">10일간</b-button>&emsp;
                                    <b-button :disabled="didBuy!=1" variant="outline-secondary" @click="selectedDate('20date')" size="sm">20일간</b-button>&emsp;
                                    <b-button :disabled="didBuy!=1" variant="outline-secondary" @click="selectedDate('1month')" size="sm">1달</b-button>&emsp;
                                    <b-button :disabled="didBuy!=1" variant="outline-secondary" @click="selectedDate('3month')" size="sm">3달</b-button>&emsp;
                                </div>
                            </div>
                        </div>
                    </div>
              </td>
          </tr>
          <tr>
              <th>직접검색</th>
              <td>
                  <select class="mr-2 form-control float-left" :style="{width:'90px'}">
                      <option value="">전체</option>
                      <option value="">아이디</option>
                      <option value="">이름</option>
                  </select>
                  <input @keypress.enter="search" type="text" class="mr-2 form-control float-left" :style="{width:'200px'}"><button @click="search" class="btn btn-dark">검색</button>
              </td>
          </tr>
      </table>
  </div>
</template>

<script>
import moment from 'moment'

export default {
   props:['dateInfo','didBuy'],
   methods:{
       changeGroupType(e){
           this.$emit('changeGroupType',[e.target.name,e.target.value])
        },
       selectedDate: function (flag) {
            switch(flag){
                case 'today':
                    this.dateInfo.startDate = moment(new Date()).format('YYYY-MM-DD')
                    this.dateInfo.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case 'yester':
                    this.dateInfo.startDate = moment(new Date()).add(-1, 'd').format('YYYY-MM-DD')
                    this.dateInfo.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case '3date':
                    this.dateInfo.startDate = moment(new Date()).add(-3, 'd').format('YYYY-MM-DD')
                    this.dateInfo.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case '7date':
                    this.dateInfo.startDate = moment(new Date()).add(-7, 'd').format('YYYY-MM-DD')
                    this.dateInfo.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case '10date':
                    this.dateInfo.startDate = moment(new Date()).add(-10, 'd').format('YYYY-MM-DD')
                    this.dateInfo.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case '20date':
                    this.dateInfo.startDate = moment(new Date()).add(-20, 'd').format('YYYY-MM-DD')
                    this.dateInfo.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case '1month':
                    this.dateInfo.startDate = moment(new Date()).add(-1, 'M').format('YYYY-MM-DD')
                    this.dateInfo.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case '3month':
                    this.dateInfo.startDate = moment(new Date()).add(-3, 'M').format('YYYY-MM-DD')
                    this.dateInfo.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
            }
        },
        search(){
            this.$emit('search')
        }
   }
}
</script>

<style>

</style>