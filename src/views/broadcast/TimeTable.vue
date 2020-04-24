<template>
   <div id="contents">
       <h3><font-awesome-icon icon="play-circle" /> {{ $route.name }}</h3>
       <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>방송관리</li>
            <li>편성표관리</li>
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

       <b-row class="box">
           <b-col cols="2">
               <b-input-group>
                    <b-form-input size="sm" v-model="TimeTableObject.startDate" type="text" placeholder="방송일자"></b-form-input>
                    <b-input-group-append>
                        <b-form-datepicker button-variant="outline-secondary" size="sm" button-only right
                          v-model="TimeTableObject.startDate">
                        </b-form-datepicker>
                    </b-input-group-append>
                </b-input-group>
           </b-col>
            <b-col cols="10" class="dateLimitDisplay"> 
                <b-button variant="outline-secondary" size="sm"
                   v-for="item in menuObject.menus" :key="item.id"
                   :class="{active: displayContents(item.id)}"
                   @click="selectMenuName(item.id)">{{ item.name }}</b-button>
            </b-col>
       </b-row>
    
        <div v-if="displayContents('01')">    
            <BroadcastTimeTableWeek :mode="TimeTableObject"
              :timeTabelDataToday = "timeTabelDataToday"
              :timeTabelDataBefore = "timeTabelDataBefore"
              :timeTabelDataBefore2 = "timeTabelDataBefore2"
              :timeTabelDataAfter = "timeTabelDataAfter"
              :timeTabelDataAfter2 = "timeTabelDataAfter2"
              />
        </div>
        <div v-if="displayContents('02')">
            <BroadcastTimeTableNot />
        </div>
        <div v-if="displayContents('03')">
            <BroadcastTimeTableDay />
        </div>
        <div v-if="displayContents('04')">
            <BroadcastTimeTableState />
        </div>

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
            menuObject : {
                activeMenuName : '',
                menus:[
                    {'id':'01', 'name': '전후 5일'},
                    {'id':'02', 'name':'일자별'},
                    {'id':'03', 'name':'편성상태별'},
                    {'id':'04', 'name':'미 방송'}
                ]
            },
            TimeTableObject: {
                startDate: '',
                status: null,
                didnPlay:null
            },
            timeTabelDataToday:[],
            timeTabelDataBefore:[],
            timeTabelDataBefore2:[],
            timeTabelDataAfter:[],
            timeTabelDataAfter2:[]
        }
    },
    mounted () {
        this.loadTimeTableData('today') // 오늘 편성표 불러오기
        this.loadTimeTableData('before') // 어제 편성표 불러오기
        this.loadTimeTableData('before2') // 그제 편성표 불러오기
        this.loadTimeTableData('after') // 내일 편성표 불러오기
        this.loadTimeTableData('after2') // 모레 편성표 불러오기
        this.menuObject.activeMenuName = this.menuObject.menus[0].id;
        this.changeDate
    },
    computed: {        
        changeDate () {
            var vm = this
            return  vm.TimeTableObject.startDate = moment(new Date()).format('YYYY-MM-DD')
        }
    },
    methods:{
        selectMenuName(idx) {
            this.menuObject.activeMenuName = idx
        },
        displayContents(idx) {
            return this.menuObject.activeMenuName === idx
        },
        loadTimeTableData(startDate) {
            switch (startDate) {
                case 'today':
                    return this.axiosGetRequest('/api/v1/broadcasts/schedules/list', {'startDate': moment(new Date()).format('YYYYMMDD')},this.loadTimeTableListToday);                
                case 'before':
                    return this.axiosGetRequest('/api/v1/broadcasts/schedules/list', {'startDate': moment(new Date()).subtract(1, 'days').format('YYYYMMDD')},this.loadTimeTableListBefore);
                case 'before2':
                    return this.axiosGetRequest('/api/v1/broadcasts/schedules/list', {'startDate': moment(new Date()).subtract(2, 'days').format('YYYYMMDD')},this.loadTimeTableListBefore2);
                case 'after':
                    return this.axiosGetRequest('/api/v1/broadcasts/schedules/list', {'startDate': moment(new Date()).add(1, 'days').format('YYYYMMDD')},this.loadTimeTableListAfer);
                case 'after2':
                    return this.axiosGetRequest('/api/v1/broadcasts/schedules/list', {'startDate': moment(new Date()).add(2, 'days').format('YYYYMMDD')},this.loadTimeTableListAfter2);
            }
        },
        loadTimeTableListToday:  function (res) {
            console.log(res)
            if(res.data.jsonData.resultCode === '0004') {
                this.timeTabelDataToday = []
                return false
            }
            this.timeTabelDataToday = res.data.jsonData.broadcasts
        },
        loadTimeTableListBefore:  function (res) {
            console.log(res)
            if(res.data.jsonData.resultCode === '0004') {
                this.timeTabelDataBefore = []
                 return false
            }
            this.timeTabelDataBefore = res.data.jsonData.broadcasts
        },
        loadTimeTableListBefore2:  function (res) {
            console.log(res)
            if(res.data.jsonData.resultCode === '0004') {
                this.timeTabelDataBefore2 = []
                 return false
            }
            this.timeTabelDataBefore2 = res.data.jsonData.broadcasts
        },
        loadTimeTableListAfer:  function (res) {
            console.log(res)
            if(res.data.jsonData.resultCode === '0004') {
                this.timeTabelDataAfter = []
                 return false
            }
            this.timeTabelDataAfter = res.data.jsonData.broadcasts
        },
        loadTimeTableListAfer2:  function (res) {
            console.log(res)
            if(res.data.jsonData.resultCode === '0004') {
                this.timeTabelDataAfter2 = []
                 return false
            }
            this.timeTabelDataAfter2 = res.data.jsonData.broadcasts
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