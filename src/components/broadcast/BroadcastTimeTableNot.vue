<template>
  <div>
      <table class="mform time_table">
            <colgroup>
                <col width="5%">
                <col width="5%">
            </colgroup>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>썸네일</th>
                    <th>ID</th>
                    <th>예약일자(유저)</th>
                    <th>제목</th>
                    <th>승인일시(관리자)</th>
                    <th>누적횟수</th>
                    <th>관리</th>
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
                    <td>미방송 1회</td>
                    <td><b-button variant="secondary" @click="$refs.stopModal.show()">제재</b-button></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td><img src="@/assets/img/201324739120470.jpg" /></td>
                    <td>hanbyul</td>
                    <td>2019.12.23 17:11:41</td>
                    <td>염색머리 관리 팁</td>
                    <td>2019.12.23 17:11:41</td>
                    <td>미방송 1회</td>
                    <td><b-button variant="secondary">제재</b-button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td><img src="@/assets/img/201324739120470.jpg" /></td>
                    <td>hanbyul</td>
                    <td>2019.12.23 17:11:41</td>
                    <td>염색머리 관리 팁</td>
                    <td>2019.12.23 17:11:41</td>
                    <td>미방송 1회</td>
                    <td><b-button variant="secondary">제재</b-button></td>
                </tr>
            </tbody>
      </table> 

       <b-modal ref="stopModal">
           <template v-slot:modal-title>
                <font-awesome-icon icon="info-circle" /> 제재 처리
            </template>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="t_form">
                        <colgroup><col width="100"></colgroup>                       
                        <tbody>
                            <tr>
                                <th>제재 대상자</th>
                                <td>
                                    <input type="text" name="targetUser" value="aha101" class="text_input" style="width:150px" maxlength="20" disabled>
                                    <b-button variant="info" size="sm" @click="$refs.warningList.show()">신고/제재내역 확인</b-button>
                                </td>
                            </tr>
                            <tr>
                                <th>제재 사유</th>
                                <td>
                                    <input type="text" name="writer" value="미방송" class="text_input" style="width:130px" maxlength="20">
                                </td>
                            </tr> 
                            <tr>
                                <th>제재 처리 내용</th>
                                <td>
                                    <input type="text" name="writer" value="경고" class="text_input" style="width:48%;margin-right:5px" maxlength="20">
                                    <input type="text" name="writer" value="경고" class="text_input" style="width:48%" maxlength="20">
                                </td>
                            </tr> 
                            <tr>
                                <th>상세 제재 사유</th>
                                <td>
                                    <textarea name="content" rows="5" class="text_input" style="width:98%;min-height:50px">미방송 1회</textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
       </b-modal>

       <b-modal ref="warningList">
                    <template v-slot:modal-title>
                        <font-awesome-icon icon="info-circle" /> 신고/제재 내역
                    </template>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="t_form"> 
                         <colgroup><col width="22%"><col width="20%"><col width="34%"><col width="24%"></colgroup>                                              
                        <thead>
                             <tr>
                                <th>신고날짜</th>
                                <th>신고사유</th>
                                <th>제재내역</th>
                                <th>제재처리날짜</th>                                
                            </tr>
                        </thead>
                        <tbody>                           
                            <tr>
                                <td>2019.12.12 19:38</td>
                                <td>경고3회누적</td>
                                <td>7일간 이용정지<br>(2019.10.8~2019.10.9)</td>
                                <td>2019.12.12 19:38</td>
                            </tr>                          
                            <tr>
                                <td>2019.12.12 19:38</td>
                                <td>미방송</td>
                                <td>경고3회</td>
                                <td>2019.12.12 19:38</td>
                            </tr>
                            <tr>
                                <td>2019.12.12 19:38</td>
                                <td>미방송</td>
                                <td>경고3회</td>
                                <td>2019.12.12 19:38</td>
                            </tr>
                        </tbody>
                    </table>
                </b-modal>
  </div>
</template>

<script>
export default {

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