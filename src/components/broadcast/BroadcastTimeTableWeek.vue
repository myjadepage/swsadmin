<template>
    <div>
        <!-- 24시간 -->
        <div class="timeArea time_table_area">
            <h4>시간 </h4>
            <ul>
                <li v-for="item in timeObject" :key="item.id" style="">{{ item.time }}</li>
            </ul>
        </div>

        <!-- 그저께 방송 -->
        <div class="timeArea time_table_con">
            <h4>{{ changeDate('before2') }} <b-button variant="info" size="sm">6건</b-button></h4>
            <ul>
                <li v-for="item in timeObject" :key="item.id">
                    <div class="img_area">
                        <img src="@/assets/img/201324739120470.jpg" />                       
                        <div class="button_area">
                            <span class="more">예약된 방송 5건 더보기</span>                          
                        </div>
                    </div>
                    <div class="text_area">
                        <p>ID : hanmsjl</p>
                        <strong>제목 : 염색머리 관리 꿀팁 </strong>
                    </div>
                </li>
            </ul>
        </div>

        <!-- 어제 방송 -->
        <div class="timeArea time_table_con">
            <h4>{{ changeDate('before') }} <b-button variant="info" size="sm">6건</b-button></h4>
            <ul>
                <template v-if="timeTabelDataBeforeList.length > 0">
                    <li v-for="item in timeTabelDataBeforeList" :key="item.index">
                        <div class="img_area">
                            <img src="@/assets/img/201324739120470.jpg" />                       
                            <div class="button_area">
                                <span class="more">예약된 방송 5건 더보기</span>                          
                            </div>
                        </div>
                        <div class="text_area">
                            <p>ID : hanmsjl</p>
                            <strong>제목 : 염색머리 관리 꿀팁 </strong>
                        </div>
                    </li>
                </template>
                <template v-else>
                    <li v-for="item in timeObject" :key="item.index"> 방송이 없습니다.</li>
                </template>
            </ul>
        </div>

        <!-- 오늘 방송 -->
        <div class="timeArea time_table_con today" >
            <h4>{{ changeDate('today') }} <b-button variant="info" size="sm">6건</b-button></h4>
            <ul>
                <template v-if="timeTabelDataTodayList.length > 0">
                    <li v-for="item in timeTabelDataTodayList" :key="item.index" >
                        <div class="img_area">                           
                            <img src="@/assets/img/201324739120470.jpg" />                       
                            <div class="button_area">
                                <span class="more">예약된 방송 5건 더보기</span>                          
                            </div>
                        </div>
                        <div class="text_area">
                            <p>ID : hanmsjl</p>
                            <strong>제목 : 염색머리 관리 꿀팁 </strong>
                        </div>
                    </li>
                </template>
                <template v-else>
                    <li v-for="item in timeObject" :key="item.index"> 방송이 없습니다.</li>
                </template>
            </ul>
        </div>

        <!-- 내일 방송 -->
        <div class="timeArea time_table_con">
            <h4>{{  changeDate('after') }} <b-button variant="info" size="sm">6건</b-button></h4>
            <ul>
                <li v-for="item in timeObject" :key="item.id">
                    <div class="img_area">
                        <img src="@/assets/img/201324739120470.jpg" />                       
                        <div class="button_area">
                            <span class="more">예약된 방송 5건 더보기</span>                          
                        </div>
                    </div>
                    <div class="text_area">
                        <p>ID : hanmsjl</p>
                        <strong>제목 : 염색머리 관리 꿀팁 </strong>
                    </div>
                </li>
            </ul>
        </div>

        <!-- 모레 방송 -->
        <div class="timeArea time_table_con">
            <h4>{{  changeDate('after2') }} <b-button variant="info" size="sm">6건</b-button></h4>
            <ul>
                <li v-for="item in timeObject" :key="item.id" style="">
                    <div class="img_area">
                        <img src="@/assets/img/201324739120470.jpg" />                       
                        <div class="button_area">
                            <span class="more">예약된 방송 5건 더보기</span>                          
                        </div>
                    </div>
                    <div class="text_area">
                        <p>ID : hanmsjl</p>
                        <strong>제목 : 염색머리 관리 꿀팁 </strong>
                    </div>

                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
 
</style>
<script>
import commonJs from '@/assets/js/common.js'
import moment from 'moment'

export default {
  mixins: [ commonJs ],  
  props:[ 'timeTabelDataToday','timeTabelDataBefore','timeTabelDataBefore2', 'timeTabelDataAfter','timeTabelDataAfter2', 'mode'],
  data () {      
      return {
        timeTabelDataTodayList:[],
        timeTabelDataBeforeList:[],
        timeTabelDataBeforeList2:[],
        timeTabelDataAfterList:[],
        timeTabelDataAfterList2:[],
        timeTableFive:[],
        timeObject: [
            {'id' : '01', 'time' : '01:00'},{'id' : '02', 'time' : '02:00'},{'id' : '03', 'time' : '03:00'},{'id' : '04', 'time' : '04:00'},
            {'id' : '05', 'time' : '05:00'},{'id' : '06', 'time' : '06:00'},{'id' : '07', 'time' : '07:00'},{'id' : '08', 'time' : '08:00'},
            {'id' : '09', 'time' : '09:00'},{'id' : '10', 'time' : '10:00'},{'id' : '11', 'time' : '11:00'},{'id' : '12', 'time' : '12:00'},
            {'id' : '13', 'time' : '13:00'},{'id' : '14', 'time' : '14:00'},{'id' : '15', 'time' : '15:00'},{'id' : '16', 'time' : '16:00'},
            {'id' : '17', 'time' : '17:00'},{'id' : '18', 'time' : '18:00'},{'id' : '19', 'time' : '19:00'},{'id' : '20', 'time' : '20:00'},
            {'id' : '21', 'time' : '21:00'},{'id' : '22', 'time' : '22:00'},{'id' : '23', 'time' : '23:00'},{'id' : '24', 'time' : '24:00'}
        ]
      }
  }, 
  mounted () {
      this.mappingDataToday(this.timeTabelDataToday)
      this.mappingDataBefore(this.timeTabelDataBefore)
      this.mappingDataBefore2(this.timeTabelDataBefore2)
      this.mappingDataAfter(this.timeTabelDataAfter)
      this.mappingDataAfter2(this.timeTabelDataAfter2)
  },
  methods: {
       changeDate(flag) {
           switch (flag) {
               case 'today': return moment(this.mode.startDate).format('MM-DD (ddd)')
               case 'before': return moment(this.mode.startDate).subtract(1, 'days').format('MM-DD (ddd)')
               case 'before2': return moment(this.mode.startDate).subtract(2, 'days').format('MM-DD (ddd)')
               case 'after': return moment(this.mode.startDate).add(1, 'days').format('MM-DD (ddd)')
               case 'after2': return moment(this.mode.startDate).add(2, 'days').format('MM-DD (ddd)')
               default: return moment(new Date()).format('MM-DD (dddd)')
           }
      },
      mappingDataToday(data) {         
          if(data) {            
                for(let i=0; i< data.length; i++) {
                    this.timeTableFive.push({
                        'broadcastPrdts' : data[i].broadcastPrdts,
                        'broadcastScheduleSysId' : data[i].broadcastScheduleSysId,
                        'broadcastSysId' : data[i].broadcastSysId,
                        'endTime' : data[i].endTime,
                        'reservationCnt' : data[i].reservationCnt,
                        'startDate' : data[i].startDate,
                        'startTime' : data[i].startTime,
                        'title' : data[i].title,
                        'treatFlag' : data[i].treatFlag
                    })
                    this.timeTabelDataTodayList = this.timeTableFive             
                }
          }
      },
      mappingDataBefore(data) {         
          if(data) {                 
               for(let i=0; i< data.length; i++) {
                 this.timeTableFive.push({
                     'broadcastPrdts' : data[i].broadcastPrdts,
                     'broadcastScheduleSysId' : data[i].broadcastScheduleSysId,
                     'broadcastSysId' : data[i].broadcastSysId,
                     'endTime' : data[i].endTime,
                     'reservationCnt' : data[i].reservationCnt,
                     'startDate' : data[i].startDate,
                     'startTime' : data[i].startTime,
                     'title' : data[i].title,
                     'treatFlag' : data[i].treatFlag
                 })
                 this.timeTabelDataBeforeList = this.timeTableFive             
              }
          }
      }
  }
}
</script>

<style scoped>
.time_table_area {
    width: 100px;
}
.time_table_area li {
    font-weight: bold;
}
.time_table_con{
    width: 18.5%;
}
.time_table_con h4 {
    background-color: #fdfdfd;
}
.timeArea {
    float: left;    
    margin-top: 10px;
    border: 1px solid #eee;
    text-align: center;
}
.timeArea.today, .timeArea.today h4 {
    background-color: #c8dbf8;
}
.timeArea h4 {
    height: 40px;
    font-size: 15px;
    font-weight: bold;
    padding: 10px;    
}
.timeArea li {
    text-align: center;
    height: 244px;
    padding: 20px;
    border-top: 1px solid #eee;
}
.timeArea .img_area{
    position: relative;
    height: 150px;
}
.timeArea .img_area img{ 
    max-width: 100%;
    height: 100%;
}
.timeArea .button_area {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px;
    background-color: rgba(0,0,0,0.5);
}
.timeArea .button_area .more{
    text-decoration: underline;
    cursor: pointer;
}
.timeArea .button_area .more:hover{
    color: aquamarine;
}
.timeArea .button_area span{
    color: #fff;
    font-size: 12px;
}
.timeArea .text_area{
    text-align: left;
}
.timeArea .text_area p{
    padding-top: 10px;
    color: blue;
}
.timeArea .text_area strong{
    display: block;
    margin-top: 5px;
}
</style>