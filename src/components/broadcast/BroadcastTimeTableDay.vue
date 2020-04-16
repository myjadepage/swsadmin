<template>
  <div>
      <table class="mform time_table">
            <colgroup>
                <col width="5%">
                <col width="5%">
            </colgroup>
            <thead>
                <tr>
                    <th>시간</th>
                    <th>번호</th>
                    <th>썸네일</th>
                    <th>ID</th>
                    <th>등록일자</th>
                    <th>제목</th>
                    <th>최고시청자 수</th>
                    <th>예약자 수</th>
                    <th>상태</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td rowspan="4">00:00</td>
                    <td>1</td>
                    <td><img src="@/assets/img/201324739120470.jpg" /></td>
                    <td>hanbyul</td>
                    <td>2019.12.23 17:11:41</td>
                    <td>염색머리 관리 팁</td>
                    <td>10,000</td>
                    <td>5,000</td>
                    <td> 방송종료</td>
                </tr>
                <tr>                  
                    <td>2</td>
                    <td><img src="@/assets/img/201324739120470.jpg" /></td>
                    <td>hanbyul</td>
                    <td>2019.12.23 17:11:41</td>
                    <td>염색머리 관리 팁</td>
                    <td>10,000</td>
                    <td>5,000</td>
                    <td>방송중</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td><img src="@/assets/img/201324739120470.jpg" /></td>
                    <td>hanbyul</td>
                    <td>2019.12.23 17:11:41</td>
                    <td>염색머리 관리 팁</td>
                    <td>10,000</td>
                    <td>5,000</td>
                    <td> 방송예정</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td><img src="@/assets/img/201324739120470.jpg" /></td>
                    <td>hanbyul</td>
                    <td>2019.12.23 17:11:41</td>
                    <td>염색머리 관리 팁</td>
                    <td>10,000</td>
                    <td>5,000</td>
                    <td> 미방송</td>
                </tr>

            </tbody>
      </table>     
      
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