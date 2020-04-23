<template>
  <div class="searchTableWrap">
      <table class="table">
          <tr>
              <th>그룹별</th>
              <td>
                  <select name="" id="" class="mr-2" :style="{width:'90px'}">
                      <option>연령대</option>
                      <option>20세 미만</option>
                      <option>20세 ~ 29세</option>
                      <option>30세 ~ 39세</option>
                      <option>40세 ~ 49세</option>
                      <option>50세 ~ 59세</option>
                      <option>60세 이상</option>
                  </select>
                  <select name="" id="" class="mr-2" :style="{width:'70px'}">
                      <option>성별</option>
                      <option>남자</option>
                      <option>여자</option>
                  </select>
                  <select name="" id="" class="mr-2" :style="{width:'90px'}">
                      <option>회원등급</option>
                      <option>일반회원</option>
                      <option>코알라회원</option>
                  </select>
              </td>
          </tr>
          <tr>
              <th>구매이력</th>
              <td>
                  <div class="row">
                      <div class="col col-1">
                        <select :style="{width:'80px'}">
                            <option value="">전체</option>
                            <option value="">없음</option>
                            <option value="">있음</option>
                        </select>
                      </div>
                      <div class="col col-11">
                          <div class="row">
                            <label>금액</label><input class="ml-2 mr-2" type="number"><label class="mr-2">원</label> ~ <input class="ml-2 mr-2" type="number"><label for="">원</label>
                          </div>
                          <div class="row mt-2">
                              <label for="" class="mr-2">기간</label><sws-date :parentData="dateInfo"/>
                          </div>
                      </div>
                    
                  </div>
              </td>
          </tr>
          <tr>
              <th>직접검색</th>
              <td>
                  <select class="mr-2" :style="{width:'70px'}">
                      <option value="">전체</option>
                      <option value="">아이디</option>
                      <option value="">이름</option>
                  </select>
                  <input type="text" class="mr-2"><button class="btn btn-dark">검색</button>
              </td>
          </tr>
      </table>
  </div>
</template>

<script>
import commonJs from '@/assets/js/common.js'
import SwsDate from '@/components/common/SwsDate'


export default {
   mixins: [ commonJs ],
   components:{
       SwsDate
   },
   data(){
       return{
           dateInfo:{
               startDate:'',
               endDate:'',
           }
       }
   }
}
</script>

<style>

</style>