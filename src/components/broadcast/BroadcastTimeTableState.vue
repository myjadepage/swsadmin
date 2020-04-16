<template>
  <div>
      <b-row class="box" style="padding:15px">
        <b-col cols="2">
            <b-input-group>
                <b-form-input size="sm" id="example-input" v-model="StateObject.startDate" type="text" placeholder="시작일자 (YYYY-MM-DD)"></b-form-input>
                <b-input-group-append>
                    <b-form-datepicker button-variant="outline-secondary" size="sm" v-model="StateObject.startDate" button-only right></b-form-datepicker>
                </b-input-group-append>
            </b-input-group>
        </b-col>
        <b-col cols="2">
            <b-input-group>
                <b-form-input size="sm" id="example-input" v-model="StateObject.endDate" type="text" placeholder="종료일자 (YYYY-MM-DD)"></b-form-input>
                <b-input-group-append>
                    <b-form-datepicker button-variant="outline-secondary" size="sm" v-model="StateObject.endDate" button-only right></b-form-datepicker>
                </b-input-group-append>
            </b-input-group>
        </b-col> 
        <b-col cols="5" class="dateLimitDisplay">
            <b-button variant="outline-secondary" @click="selectedDate('yester')" size="sm">어제</b-button>&emsp;
            <b-button variant="outline-secondary" @click="selectedDate('7date')" size="sm">7일간</b-button>&emsp;
            <b-button variant="outline-secondary" @click="selectedDate('1month')" size="sm">최근30일</b-button>&emsp;
            <b-button variant="outline-secondary" @click="selectedDate('1month')" size="sm">이번달</b-button>&emsp;
            <b-button variant="outline-secondary" @click="selectedDate('1month')" size="sm">전월</b-button>&emsp;
        </b-col>
          
         <b-col cols="1">
             <select class="text_input">
                <option value="">전체</option>
                <option value="">받송예정</option>
                <option value="">방송중</option>
                <option value="">방송종료</option>
                <option value="">미방송</option>
                <option value="">승인대기중</option>
                <option value="">승인완료</option>
                <option value="">승인거절</option>
            </select>
         </b-col>
         <b-col cols="2">
            <b-button variant="info" size="sm" class="fr">검색</b-button>
            <input type="text" class="text_input fr" placeholder="검색" />
        </b-col>    
    </b-row>   
    
      <table class="mform time_table" style="margin-top:40px">
            <colgroup>
                <col width="5%">               
            </colgroup>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>썸네일</th>
                    <th>ID</th>
                    <th>예약일자(유저)</th>
                    <th>제목</th>
                    <th>처리일시</th>
                    <th>상태</th>
                    <th>취소사유(취소했을 경우)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td><img src="@/assets/img/201324739120470.jpg" /></td>
                    <td>hanbyul</td>
                    <td>2019.12.23 17:11:41</td>
                    <td>염색머리 관리 팁</td>
                    <td>2019.12.23 17:11:41</td>
                    <td>승인 대기중</td>
                    <td>-</td>
                </tr>
            </tbody>
      </table> 
  </div>
</template>

<script>
import commonJs from "@/assets/js/common.js"
import moment from 'moment'

export default {
    mixins: [
         commonJs
     ],
     data () {
        return {           
            StateObject: {
                startDate: '',
                startTime: ''
            }
        }
    },
     mounted () {
        this.StateObject.startDate = moment(new Date()).add(-1, 'M').format('YYYY-MM-DD')
        this.StateObject.endDate = moment(new Date()).format('YYYY-MM-DD')
    },
    methods:{
        selectedDate: function (flag) {
            switch(flag){
                case 'today':
                    this.StateObject.startDate = moment(new Date()).format('YYYY-MM-DD')
                    this.StateObject.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case 'yester':
                    this.StateObject.startDate = moment(new Date()).add(-1, 'd').format('YYYY-MM-DD')
                    this.StateObject.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case '3date':
                    this.StateObject.startDate = moment(new Date()).add(-3, 'd').format('YYYY-MM-DD')
                    this.StateObject.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case '7date':
                    this.StateObject.startDate = moment(new Date()).add(-7, 'd').format('YYYY-MM-DD')
                    this.StateObject.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
            }
        }
    }
}
</script>

<style>
.time_table th{
    font-weight: bold;
    line-height: 45px;
}
.time_table td{
    text-align: center;
    padding: 20px;
}

</style>