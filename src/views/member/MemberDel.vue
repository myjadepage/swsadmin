<template>
  <div id="contents">
                <h3>{{ $route.name }}</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>회원관리</li>
                    <li>회원관리</li>
                    <li class="on">{{ $route.name }}</li>
                </ul>
                <ul class="helpbox">
                    <li>회원탈퇴처리가 될 경우 해당회원의 아이디와 성명을 남기고 그외 기타 적립금 및 Wishlist 등 삭제됩니다.</li>
                </ul>


                <form name="Frm">
                    <div class="section_head">
                        <h4><i class="xi-check-circle"></i> 전체 정보 - 총 <strong>1</strong>개의 정보가 등록되어있습니다.</h4>
                        <div>
                            <select id="code" name="code" class="text_input" onchange="changeOption(this);">
                                <option value="">전체</option>
                                <option value="no">미확인 내역</option>
                                <option value="ok">처리된 내역</option>
                                <option value="3m">3개월 지난 내역</option>
                            </select>
                        </div>
                    </div>

                    <table class="t_list">
                        <caption>탈퇴 회원목록</caption>
                        <colgroup>
                            <col width="70">
                            <col width="130">
                            <col width="*">
                            <col width="80">
                            <col width="80">
                            <col width="100">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>아이디</th>
                                <th>불편사항</th>
                                <th>등록일</th>
                                <th>진행</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>1</td>
                                <td>wonej99</td>
                                <td class="left">교환/환불/반품에 대한 불만<br>이벤트/회원서비스가 다양하지 않음<br>개인정보 유출우려</td>
                                <td>2019-05-03</td>
                                <td>미확인</td>
                                <td>

                                    <div><button type="button" class="btn btn-sm btn-default" onclick="secession(71)">탈퇴처리</button></div>
                                    <div class="mgt3"><button type="button" class="btn btn-sm btn-danger" onclick="del(71)">처리않고 삭제</button></div>

                                </td>
                            </tr>

                        </tbody>
                    </table>

                    <div class="fclear mgt10">
                        <div style="float:right;">
                            <div style="float:left; width:15px; height:15px; border:1px solid #CCC; background-color:#FFF0F8;"></div>
                            <div style="float:left; margin:2px 0 0 3px;">미확인 내역</div>
                            <div style="float:left; width:15px; height:15px; border:1px solid #CCC; background-color:#FFF; margin-left:20px;"></div>
                            <div style="float:left; margin:2px 0 0 3px;">처리된 내역</div>
                        </div>
                    </div>

                </form>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>