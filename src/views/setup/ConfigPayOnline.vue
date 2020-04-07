<template>
  
            <div id="contents">
                <h3>온라인입금계좌</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>환경설정</li>
                    <li>결제정보관리</li>
                    <li class="on">온라인입금계좌</li>
                </ul>
                <ul class="helpbox">
                    <li>결제에 필요한 온라인 입금 계좌 정보를 관리하는 곳입니다.</li>
                    <li>아래 내용을 입력하시면 자동으로 쇼핑몰에 적용됩니다.</li>
                </ul>

                <form name="Frm" method="post">
                    <div class="box">
                        <div class="section_head">
                            <h4><i class="xi-check-circle"></i> 온라인입금사용</h4>
                        </div>

                        <table class="t_form">
                            <caption>온라인입금 사용여부</caption>
                            <tbody>
                                <tr>
                                    <th>온라인입금 사용여부</th>
                                    <td>
                                        <dl class="choose">
                                            <dt><input type="checkbox" name="usePayway" value="128" checked="" onclick="checkUsePayway(this)"></dt>
                                            <dd>온라인입금을 사용합니다.</dd>
                                        </dl>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="box">
                        <div class="section_head">
                            <h4><i class="xi-check-circle"></i> 입금계좌목록</h4>
                        </div>

                        <table class="t_list">
                            <caption>입금계좌목록 리스트</caption>
                            <colgroup>
                                <col width="100">
                                <col width="300">
                                <col width="*">
                                <col width="200">
                                <col width="100">
                                <col width="100">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>은행명</th>
                                    <th>계좌번호</th>
                                    <th>예금주</th>
                                    <th>주계좌</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>ASDAS</td>
                                    <td class="left">ASD</td>
                                    <td>DASDSAD</td>
                                    <td><input type="radio" name="isMain" checked="" main="1"></td>
                                    <td><button type="button" class="btn btn-sm btn-danger">삭제</button></td>
                                </tr>
                            </tbody>
                            <tbody>
                            </tbody>
                        </table>
                    </div>

                    <div class="box">
                        <div class="section_head">
                            <h4><i class="xi-check-circle"></i> 입금계좌추가</h4>
                        </div>

                        <table class="t_form">
                            <caption>입금계좌 추가 폼</caption>
                            <tbody>
                                <tr>
                                    <th>은행명</th>
                                    <td><input type="text" name="bank" class="text_input" maxlength="50"></td>
                                    <th>예금주</th>
                                    <td><input type="text" name="depositor" class="text_input" maxlength="100"></td>
                                </tr>
                                <tr>
                                    <th>계좌번호</th>
                                    <td colspan="3"><input type="text" name="account" class="text_input" maxlength="100"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="btn_center">
                        <button type="button" class="btn btn-info">확인</button>
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