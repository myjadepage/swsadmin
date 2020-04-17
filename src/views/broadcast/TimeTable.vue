<template>
   <div id="contents">
       <h3><font-awesome-icon icon="play-circle" /> {{ $route.name }}</h3>
       <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>방송편성표관리</li>
            <li class="on">{{ $route.name }}</li>
       </ul>

       <ul class="row" style="clear:both;margin:50px 0">
            <li class="col col-3">
                <div class="broadcastCount">
                    <span><font-awesome-icon icon="play-circle" /></span>
                    <h5 class="count_title">총 방송 수 <strong>132,456</strong></h5>
                </div>
            </li>
            <li class="col col-3">
                <div class="broadcastCount">
                    <span><font-awesome-icon icon="clock" /></span>
                   <h5 class="count_title">지난 방송 수 <strong>132,456</strong></h5>
                </div>
            </li>
            <li class="col col-3">
                <div class="broadcastCount">
                    <span><font-awesome-icon icon="calendar-check" /></span>
                   <h5 class="count_title">예약된 방송 수 <strong>132,456</strong></h5>
                </div>
            </li>
            <li class="col col-3">
                <div class="broadcastCount">
                    <span><font-awesome-icon icon="coffee" /></span>
                    <h5 class="count_title">미 방송 수 <strong>132,456</strong></h5>
                </div>
            </li>
        </ul>

       <div class="section_head box">
            <b-col cols="10" class="dateLimitDisplay">
                <!-- <b-button variant="outline-secondary" @click="selectedDate('5date')" size="sm">전후 5일 보기</b-button>                 -->
                <b-button variant="secondary" @click="selectedDate('5date')" size="sm">전후 5일 보기</b-button>                
                <b-button variant="outline-secondary" @click="selectedDate('25date')" size="sm">일자별 보기</b-button>
                <b-button variant="outline-secondary" @click="selectedDate('3date')" size="sm">편성상태별 보기</b-button>
                <b-button variant="outline-secondary" @click="selectedDate('7date')" size="sm">미 방송 보기</b-button>
            </b-col>
            <b-col cols="2">
               <b-input-group>
                    <b-form-input size="sm" id="startDate" v-model="TimeTableObject.startDate" type="text" placeholder="방송일자"></b-form-input>
                    <b-input-group-append>
                        <b-form-datepicker button-variant="outline-secondary" size="sm" v-model="TimeTableObject.startDate"
                         @click="convertDateFormat('startDate')" button-only right>
                        </b-form-datepicker>
                    </b-input-group-append>
                </b-input-group>
           </b-col>
        </div>

<div style="display:none">
    <!-- 버튼클릭시 변경됨 -->
    <BroadcastTimeTableWeek />
    <BroadcastTimeTableDay />
    <BroadcastTimeTableState />
    
</div>
    <BroadcastTimeTableNot />

  </div>
</template>

<script>
import commonJs from "@/assets/js/common.js"
import moment from 'moment'
import BroadcastTimeTableWeek from '@/components/broadcast/BroadcastTimeTableWeek'
import BroadcastTimeTableDay from '@/components/broadcast/BroadcastTimeTableDay'
import BroadcastTimeTableState from '@/components/broadcast/BroadcastTimeTableState'
import BroadcastTimeTableNot from '@/components/broadcast/BroadcastTimeTableNot'

export default {
     mixins: [
         commonJs
     ],
    components:{
        BroadcastTimeTableWeek,
        BroadcastTimeTableDay,
        BroadcastTimeTableState,
        BroadcastTimeTableNot
    },
    data(){
        return{
             TimeTableObject: {
                startDate: '',
                startTime: ''
            }
        }
    },
    mounted () {
        this.TimeTableObject.startDate = moment(new Date()).add(-1, 'M').format('YYYY-MM-DD')
        this.TimeTableObject.endDate = moment(new Date()).format('YYYY-MM-DD')
    },
    methods:{
        selectedDate: function (flag) {
            switch(flag){
                case 'today':
                    this.TimeTableObject.startDate = moment(new Date()).format('YYYY-MM-DD')
                    this.TimeTableObject.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case 'yester':
                    this.TimeTableObject.startDate = moment(new Date()).add(-1, 'd').format('YYYY-MM-DD')
                    this.TimeTableObject.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case '3date':
                    this.TimeTableObject.startDate = moment(new Date()).add(-3, 'd').format('YYYY-MM-DD')
                    this.TimeTableObject.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case '7date':
                    this.TimeTableObject.startDate = moment(new Date()).add(-7, 'd').format('YYYY-MM-DD')
                    this.TimeTableObject.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
            }
        }
    }
}
</script>

<style>
.broadcastCount {
    width: 300px;
    height: 130px;
    line-height: 70px;
    margin: 20px;
    padding: 30px;
    background-color: #fff;
    border: 1px solid  #E5E5E5;
    border-radius: 10px;
    box-shadow: 0 1px 10px rgba(0,0,0,0.1);
    text-align: center;
}

.broadcastCount > span, .broadcastCount > .count_title{    
    float: left; 
}
.broadcastCount > span {
    width: 30%;
    font-size: 40px;
}
.broadcastCount path{
    color: #c8dbf8;
}
.broadcastCount .count_title{
    text-align: left;
    margin-top: 10px;
    padding-left: 20px;
}
.broadcastCount > .count_title strong {
    display: block;
    font-size: 25px;
}

.b-form-date-calendar header,
.b-form-date-calendar footer,
.b-time header {
    display: none;
}

</style>