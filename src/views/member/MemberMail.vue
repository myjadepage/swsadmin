<template>
  <div id="contents">
                <h3>{{ $route.name }}</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>회원관리</li>
                    <li>메일발송관리</li>
                    <li class="on">{{ $route.name }}</li>
                </ul>
                <ul class="helpbox">
                    <li>회원에게 발송하는 메일의 디자인 및 내용 등을 일괄 관리합니다.</li>
                    <li>발송그룹 선택 및 메일폼을 디자인하신 후, 발송하시면 됩니다.</li>
                    <li>이메일 입력으로 여러명에게 동시에 발송하실 경우 이메일 주소를 세미콜론(;)으로 구분하여 입력하시면 됩니다.</li>
                </ul>


                <form name="Frm">

                    <table class="t_form">
                        <caption>메일 보내기 폼</caption>

                        <tbody>
                            <tr>
                                <th>제목</th>
                                <td>
                                    <input type="text" name="subject" class="text_input" style="width:98%">
                                </td>
                            </tr>
                            <tr>
                                <th>보낼그룹</th>
                                <td>
                                    <div><input type="radio" name="group" value="total"> 회원전체 (4명)</div>
                                    <div><input type="radio" name="group" value="sleep"> 휴면회원 (9명)</div>
                                    <div><input type="radio" name="group" value="birthday"> 금일생일자 (0명)</div>
                                    <div class="mgt5"><input type="radio" name="group" value="" checked> 이메일 입력</div>
                                    <div style="padding-left:25px"><input type="text" name="email" class="text_input" style="width:98%"></div>
                                </td>
                            </tr>
                            <tr>
                                <th>메일폼사용여부</th>
                                <td>
                                    <input type="checkbox" name="isForm" value="T"> 기본메일폼 사용
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="t_form">
                        <tbody>
                            <tr>
                                <td>
                                    <div class="summernote"></div>
                                </td>

                            </tr>
                        </tbody>
                    </table>

                    <div class="btn_center">
                        <button type="button" class="btn btn-default" onclick="validSubmit()">확인</button>
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